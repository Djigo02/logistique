<?php

namespace App\Http\Controllers;

use App\Models\Campus;
use App\Models\Demande;
use App\Models\User;
use Carbon\Carbon;
use http\Env\Response;
use mysql_xdevapi\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
//            return response()->json(Demande::where('statut','acceptee')->get());
            return response()->json(Demande::all());
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }

    public function gedemandeRefuser()
    {
        try {
            return response()->json(Demande::where('statut','refusee')->get());
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }
    public function getdemande()
    {
        try {
            return response()->json(Demande::where('statut','en cours de traitement')->get());
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function sendEmail(string $destiEmail, int $idDemande)
    {
        // Récupérer la demande
        $demande = Demande::findOrFail($idDemande);

        // Récupérer le demandeur
        $userD = User::where('id', $demande->idDemandeur)->first();
        $campus = "";

        // Vérifier si l'utilisateur existe
        if (!$userD) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }else{
            $campus = Campus::findOrFail($userD->campus_id);
        }

        // Détails de la demande pour l'email
        $orderDetails = [
            'demandeur' =>  $userD->prenom.' '.$userD->nom,
            'objet' => $demande->objet,
            'campus' => $campus->nomCampus,
            'description' => $demande->description,
            'dateDemande' => $demande->dateDemande,
        ];
        // Envoyer l'email
        Mail::to($destiEmail)->cc("amyndiaye@groupeisi.com")->send(new \App\Mail\DemandeMail($orderDetails));

        // Retourner une réponse JSON
        return response()->json(['message' => 'Email envoyé avec succès']);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des champs
        $request->validate([
            'description' => 'required|string',
            'objet' => 'required|string',
            'idDemandeur' => 'required|integer',
        ]);
        $demande = new Demande();
        $user = auth()->user();
        $currentDate = Carbon::now()->toDateTimeString();
        try {
            $demande->description = $request->input('description');
            $demande->dateDemande = $currentDate;  // Date actuelle, pas celle envoyée
            $demande->statut = 'en cours de traitement';  // Statut par défaut
            $demande->objet = $request->input('objet');
            $demande->idDemandeur = $request->input('idDemandeur');
          $demande->save();
          $this->sendEmail("mouhamaddjigo0@gmail.com",$demande->id);
            return response()->json($demande);
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $demande)
    {
        try {
            return response()->json(Demande::findOrFail($demande));
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $deman)
    {

    }

    /**
     * Update the specified resource in storage.
     */

    public function getDemnadeByUser(int $id)
    {
        $demandes = Demande::where('idDemandeur',$id)->get();
        try {
            return response()->json($demandes);
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }
    public function update(Request $request,int  $id)
    {
        try {
            $demande = Demande::find($id);
            $demande->description = $request->description;
            $demande->dateDemande = $request->dateDemande;
            $demande->statut = $request->statut;
            $demande->typeDemande=$request->typeDemande;
            $demande->idDemandeur=$request->idDemandeur;
            $demande->update();
            return response()->json($demande);
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($demande)
    {
        try {
            return response()->json(Demande::destroy($demande));
        }catch (Exception $e){
            return response()->json("error",$e);
        }
    }
}
