<?php

namespace App\Http\Controllers;

use App\Models\Campus;
use App\Http\Requests\StoreCampusRequest;
use App\Http\Requests\UpdateCampusRequest;
use Exception;
use Illuminate\Http\Request;

class CampusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Lister les campus
            $campus = Campus::all();
            return response()->json($campus);
        } catch (Exception $e) {
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
     * Inserer un nouveau campus
     */
    public function store(Request $request)
    {
        // Creation d'un campus
        $request->validate([]);
        try {
            // enregistrez un nouveau campus
            $campus = new Campus();
            $campus->nomCampus = $request->nomCampus;
            $campus->telephone = $request->telephone;
            $campus->adresse = $request->adresse;
            $campus->region = $request->region;
            $campus->departement = $request->departement;
            $campus->idUser = $request->idUser;
            $campus->etat = "RAS";
            $campus->save();
            return response()->json($campus);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($campus)
    {
        // Afficher le campus
        try {
            // afficher le campus
            $leCampus = Campus::findOrFail($campus);
            return response()->json($leCampus);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Campus $campus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campus $campus)
    {
        $request->validate([
            'libelle' => 'required'|'string'
        ]);
        // Modifier un campus
        try {
            $leCampus = Campus::findOrFail($campus->id);

                // $leCampus->libelle = $request->libelle;
                // $leCampus->telephone = $request->telephone;
                // $leCampus->adresse = $request->adresse;
                // $leCampus->idUser = $request->idUser;
                // $leCampus->etat = 1;
                // $leCampus->update();

                $leCampus->update([
                    'libelle' => $request->libelle,
                    'telephone' => $request->telephone,
                    'adresse' => $request->adresse,
                    'idUser' => $request->idUser,
                    'etat' => $request->etat,
                   'region' => $request->region,
                   'departement' => $request->departement,
                    'idUser' => $request->idUser,

                ]);
            return response()->json($leCampus);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campus $campus)
    {
       // Supprimer un campus
       try {
            $leCampus = Campus::findOrFail($campus->id);
           $leCampus->delete();
            return response()->json("Campus supprimer avec success");
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }
}
