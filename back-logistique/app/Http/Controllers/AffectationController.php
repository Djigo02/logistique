<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Http\Requests\StoreAffectationRequest;
use App\Http\Requests\UpdateAffectationRequest;
use Illuminate\Http\Request;

class AffectationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            $affectation->quantite = $request->quantite;
            $affectation->idMateriel = $request->idMateriel;
            $affectation->save();

            return response()->json($affectation, 201);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Affectation $affectation)
    {
        //
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
    public function update(UpdateAffectationRequest $request, Affectation $affectation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affectation $affectation)
    {
        //
    }
}
