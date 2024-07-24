<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Http\Requests\StoreAffectationRequest;
use App\Http\Requests\UpdateAffectationRequest;
use App\Models\Log;
use App\Models\Materiel;
use App\Models\Salle;
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
        $affectation = Affectation::where('nomTable',$nomtabl)->get();
        return response()->json($affectation);
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
}
