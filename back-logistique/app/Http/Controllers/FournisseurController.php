<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use App\Http\Requests\StoreFournisseurRequest;
use App\Http\Requests\UpdateFournisseurRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $fournisseurs = Fournisseur::all();
            return response()->json($fournisseurs);
        }catch (\PHPUnit\Exception $e){
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
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
     * Inserer un nouveau fournisseur
     */
    public function store(Request $request)
    {
        // Creation d'un fournisseur
        $request->validate([]);
        try {
            // enregistrez un nouveau fournisseur
            $fournisseur = new Fournisseur();
            $fournisseur->nom = $request->nom;
            $fournisseur->email = $request->email;
            $fournisseur->telephone = $request->telephone;
            $fournisseur->adresse = $request->adresse;
            // Ajoutez d'autres attributs ici
            $fournisseur->save();
            return response()->json($fournisseur);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $fournisseur)
    {
        // Afficher le fournisseur
        try {
            // afficher le fournisseur
            $leFournisseur = Fournisseur::findOrFail($fournisseur);
            return response()->json($leFournisseur);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite ".$e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fournisseur $fournisseur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $fournisseur)
    {
        $request->validate([
            'libelle' => 'required'|'string'
        ]);
        // Modifier un fournisseur
        try {
            $leFournisseur = Fournisseur::findOrFail($fournisseur);
            $leFournisseur->update([
                'nom' => $request->nom,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'adresse' => $request->adresse,
                // Ajoutez d'autres attributs ici
            ]);
            return response()->json($leFournisseur);
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite ".$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $fournisseur)
    {
        // Supprimer un fournisseur
        try {
            $leFournisseur = Fournisseur::findOrFail($fournisseur);
            $leFournisseur->delete();
            return response()->json("Fournisseur supprimé avec succès");
        } catch (Exception $e) {
            return response()->json("Une erreur inattendue s'est produite ".$e->getMessage());
        }
    }
}
