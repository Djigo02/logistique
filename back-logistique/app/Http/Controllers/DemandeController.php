<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use Carbon\Carbon;
use http\Env\Response;
use mysql_xdevapi\Exception;
use Illuminate\Http\Request;

class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return response()->json(Demande::where('statut','acceptee')->get());
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



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $demande = new Demande();
        $user = auth()->user();
        $currentDate = Carbon::now()->toDateTimeString();
        try {
            $demande->description=$request->description;
            $demande->dateDemande=$currentDate;
            $demande->statut='en cours de traitement';
            $demande->typeDemande=$request->typeDemande;
            $demande->idDemandeur=$request->idDemandeur;
          $demande->save();
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
