<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Http\Requests\StoreAffectationRequest;
use App\Http\Requests\UpdateAffectationRequest;
use App\Models\Campus;
use App\Models\Fournisseur;
use App\Models\Log;
use App\Models\Materiel;
use App\Models\Salle;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use MongoDB\Driver\Exception\Exception;

class AffectationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $affectation = Affectation::all();
            return response()->json($affectation);
        }catch (Exception $e){
            $log =new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "index";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage(), 500);
        }
    }

    public function getAllAffectationForNT($nomtabl){
        try{
            $affectation = Affectation::where('nomTable',$nomtabl)->get();
            $liste = [];
            foreach ($affectation as $element){
                $materiel = Materiel::find($element->idMateriel);
                $element->materiel = $materiel;
                switch ($element->nomTable){
                    case 'campuses':
                        $campus = Campus::find($element->concerne_id);
                        $element->concerne = $campus;
                        break;
                    case 'salles':
                        $salle = Salle::find($element->concerne_id);
                        $element->concerne = $salle;
                        break;
                    case 'users':
                        $user = User::find($element->concerne_id);
                        $element->concerne = $user;
                        break;
                }
                $liste[] = $element;
            }

            return response()->json($liste);
        }catch (Exception $e){
            $log =new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "getAllAffectationForNT";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : ". $e->getMessage(), 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'concerne_id' => 'nullable|integer',
            'nomTable' => 'nullable|string',
            'quantite' => 'required|integer',
            'idMateriel' => 'nullable|integer|exists:materiels,id',
        ]);
        try {
            // Créer une nouvelle affectation
            $affectation = new Affectation();
            $affectation->concerne_id = $request->concerne_id;
            $affectation->nomTable = $request->nomTable;
            $affectation->idMateriel = $request->idMateriel;
            $materiel = Materiel::find($affectation->idMateriel);
            if($request->quantite <= $materiel->quantite){
                $affectation->quantite = $request->quantite;
                $materiel->quantite = $materiel->quantite - $affectation->quantite;
                $materiel->update();
            }
            $affectation->save();
            return response()->json($affectation, 201);
        } catch (Exception $e) {
            $log =new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "show";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {

        try {
            $affectation = Affectation::find($id);
            return response()->json($affectation);
        }catch (Exception $e){
            $log =new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "show";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage(), 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
//        $request->validate([
//            'concerne_id' => 'nullable|integer',
//            'nomTable' => 'nullable|string',
//            'quantite' => 'required|integer',
//            'idMateriel' => 'nullable|integer|exists:materiels,id',
//        ]);
        try {
            $affectation = Affectation::find($id);
            $affectation->concerne_id = $request->concerne_id;
            $affectation->nomTable = $request->nomTable;
            $affectation->idMateriel = $request->idMateriel;
            $materiel = Materiel::find($affectation->idMateriel);
            if($request->quantite <= $materiel->quantite){
                $affectation->quantite = $request->quantite;
                $materiel->quantite -= $affectation->quantite;
                $materiel->update();
            }
            $affectation->update();
            return response()->json(['message'=>"materiel Update", 'affectation'=>$affectation,"statusCode"=>200]);
        }catch (Exception $e){
            $log =new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "update";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $affectation = Affectation::find($id);
            $materiel = Materiel::find($affectation->idMateriel);
            $materiel->quantite += $affectation->quantite;
            $materiel->update();
            $affectation->delete();
            return response()->json(['message'=>"affectation delete","statusCode"=>200]);
        }catch (Exception $e){
            $log =new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "destroy";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage(), 500);
        }
    }

/*
 * Lister les materiels affecter aux campus, salles, ou personnels
 * $nomTable : Nom de la table correspondante ('campuses','salles','users')
 * $concerne_id : Id de l'entite concerner
 * return : La liste des materiels affecter a l'entite correspondante
 * */
    public function ListeMaterielsPour($nomTable, $concerned_id){
        try {
            $affectations = Affectation::where('nomTable', $nomTable)
                ->where('concerne_id', $concerned_id)
                ->get();
            $materiels = [];
            foreach ($affectations as $affectation){
                $materiel = Materiel::find($affectation->idMateriel);
                $materiel->quantite = $affectation->quantite;
                $materiel->dateEnregistrement = $affectation->created_at;
                $materiels[] = $materiel;
            }
            return response()->json($materiels);
        }catch (\Exception $e){
            $log =new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "ListeMateriels";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : ". $e->getMessage(), 500);
        }
    }
    /**
     * Transfert d'équipement d'un campus à un autre.
     *
     * Cette méthode transfère une quantité spécifiée d'équipement d'une affectation existante vers une nouvelle affectation.
     * Si la quantité demandée dépasse la quantité disponible ou est inférieure ou égale à zéro, une réponse JSON avec un message d'erreur et un statut de code 400 est renvoyée.
     * Sinon, une nouvelle affectation est créée et sauvegardée avec la quantité spécifiée, et la quantité de l'affectation initiale est mise à jour ou supprimée si elle atteint zéro.
     * En cas d'exception, un log est créé et une réponse JSON avec un message d'erreur et un statut de code 500 est renvoyée.
     *
     * @param Request $request Les données de la requête contenant l'identifiant de l'affectation ancienne, la quantité à transférer, et l'identifiant de la nouvelle affectation.
     * @return \Illuminate\Http\JsonResponse Une réponse JSON indiquant le succès ou l'échec de l'opération.
     */
    public function transfererEquipement(Request $request) {
        try {
            // Récupère l'affectation existante en utilisant l'identifiant fourni dans la requête
            $affectation = Affectation::find($request->idAncien);
            $newAffectation = new Affectation();

            // Vérifie si la quantité demandée est valide
            if ($request->quantite > $affectation->quantite || $request->quantite <= 0) {
                return response()->json(['message' => "Quantité indisponible", "statusCode" => 400]);
                // Ajouter une notification pour l'équipement qui n'est plus disponible
            } else {
                // Initialise la nouvelle affectation avec les données fournies
                $newAffectation->concerne_id = $request->concerne_id;
                $newAffectation->nomTable = $affectation->nomTable;
                $newAffectation->idMateriel = $affectation->idMateriel;
                $newAffectation->quantite = $request->quantite;

                // Met à jour la quantité de l'affectation existante
                $affectation->quantite -= $request->quantite;
                $affectation->quantite != 0 ? $affectation->update() : $affectation->delete();

                // Sauvegarde la nouvelle affectation
                $newAffectation->save();
                return response()->json(['message' => "Equipement transféré avec succès", "statusCode" => 200]);
            }
        } catch (Exception $e) {
            // Crée un log en cas d'exception
            $log = new Log();
            $log->class = "Affectation";
            $log->controller = "AffectationController";
            $log->methode = "transfererEquipement";
            $log->message = $e->getMessage();

            // Retourne une réponse JSON avec un message d'erreur
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage(), 500);
        }
    }

}
