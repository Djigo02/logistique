<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use App\Http\Requests\StoreSalleRequest;
use App\Http\Requests\UpdateSalleRequest;
use Exception;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Lister les salles
            $salles = Salle::all();
            return response()->json($salles);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : ".$e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Création d'une nouvelle salle
        $request->validate([]);
        try {
            // Enregistrer une nouvelle salle
            $salle = new Salle();
            $salle->nomSalle = $request->nomSalle;
            $salle->capacite = $request->capacite;
            $salle->idCampus = $request->idCampus;
            $salle->etat = "RAS";
            $salle->save();

            return response()->json($salle);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Afficher la salle
        try {
            // Afficher la salle
            $salle = Salle::findOrFail($id);
            return response()->json($salle);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : ".$e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'libelle' => 'required|string'
        ]);
        // Modifier une salle
        try {
            $salle = Salle::findOrFail($id);

            $salle->update([
                'nomSalle' => $request->nomSalle,
                'capacite' => $request->capacite,
                'idCampus' => $request->idCampus,
                'etat' => $request->etat,
            ]);
            return response()->json($salle);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : ".$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Supprimer une salle
       try {
            $salle = Salle::findOrFail($id);
            $salle->delete();
            return response()->json("Salle supprimée avec succès");
       } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : ".$e->getMessage());
       }
    }
}
