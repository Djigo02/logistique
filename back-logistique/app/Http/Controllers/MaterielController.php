<?php

namespace App\Http\Controllers;

use App\Models\Materiel;
use Illuminate\Http\Request;
use Exception;

class MaterielController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Lister les matériels
            $materiels = Materiel::all();
            return response()->json($materiels);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage());
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Création d'un nouveau matériel
        $request->validate([
            'libelle' => 'required|string',
            'sku' => 'required|string',
            'codeMateriel' => 'required|string',
            'marque' => 'required|string',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'quantite' => 'required|integer',
            'seuil' => 'required|integer',
            'amortissement' => 'required',
            'dateEnregistrement' => 'required',
            'image' => 'nullable|string',
            'idTypeMateriel' => 'required'
        ]);
        try {
            // Enregistrer un nouveau matériel
            $materiel = new Materiel();
            $materiel->reference = $request->reference;
            $materiel->codeMateriel = $request->codeMateriel;
            $materiel->description = $request->description;
            $materiel->prix = $request->prix;
            $materiel->quantite = $request->quantite;
            $materiel->seuil = $request->seuil;
            $materiel->amortissement = $request->amortissement;
            $materiel->dateEnregistrement = $request->dateEnregistrement;
            $materiel->etat = $request->etat;
            $materiel->image = $request->image;
            $materiel->idTypeMateriel = $request->idTypeMateriel;
            $materiel->idFournisseur = $request->idFournisseur;
            $materiel->save();
            return response()->json($materiel);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage());
        }
    }

    public function show(int $id)
    {
        // Afficher le type de materiel
        try {
            // afficher le type de materiel
            $materiel = Materiel::findOrFail($id);
            return response()->json($materiel);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $materiel)
    {
        // Supprimer un type de materiel
       try {
        $materiel = Materiel::findOrFail($materiel);
           $materiel->delete();
        return response()->json("Materiel supprimer avec success");
    } catch (Exception $e) {
        return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
    }
    }
}
