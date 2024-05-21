<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Http\Requests\StoreAffectationRequest;
use App\Http\Requests\UpdateAffectationRequest;
use Exception;
use Illuminate\Http\Request;

class AffectationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Lister les affectations
            $affectations = Affectation::all();
            return response()->json($affectations);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendue s'est produite ".$e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Inserer une nouvelle affectation.
     */
    public function store(Request $request)
    {
        // Création d'une affectation
        $request->validate([]);
        try {
            // Enregistrez une nouvelle affectation
            $affectation = new Affectation();
            $affectation->assigned_at = $request->assigned_at;
            $affectation->idMateriel = $request->idMateriel;
            $affectation->save();
            return response()->json($affectation);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendue s'est produite ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $affectation)
    {
        // Afficher l'affectation
        try {
            // afficher l'affectation
            $laAffectation = Affectation::findOrFail($affectation);
            return response()->json($laAffectation);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendue s'est produite ".$e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Affectation $affectation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $affectation)
    {
        $request->validate([
            'assigned_at' => 'required|integer',
            'idMateriel' => 'required|integer'
        ]);
        // Modifier une affectation
        try {
            $laAffectation = Affectation::findOrFail($affectation);
            $laAffectation->update([
                'assigned_at' => $request->assigned_at,
                'idMateriel' => $request->idMateriel
            ]);
            return response()->json($laAffectation);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendue s'est produite ".$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $affectation)
    {
        // Supprimer une affectation
        try {
            $laAffectation = Affectation::findOrFail($affectation);
            $laAffectation->delete();
            return response()->json("Affectation supprimée avec succès");
        } catch (Exception $e) {
            return response()->json("Une erreur innattendue s'est produite ".$e->getMessage());
        }
    }
}
