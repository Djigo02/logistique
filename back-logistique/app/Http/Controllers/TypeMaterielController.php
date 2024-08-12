<?php

namespace App\Http\Controllers;

use App\Models\TypeMateriel;
use App\Http\Requests\StoreTypeMaterielRequest;
use App\Http\Requests\UpdateTypeMaterielRequest;
use Exception;
use Illuminate\Http\Request;

class  TypeMaterielController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Lister les types de materiel
            $typemat = TypeMateriel::all();
            return response()->json($typemat);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
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
        // Creation d'un nouveau type de materiel
        $request->validate([]);
        try {
            // enregistrez un nouveau type de materiel
            $typemat = new TypeMateriel();
            $typemat->libelle = $request->libelle;
            $typemat->save();
            return response()->json($typemat);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    // public function show(TypeMateriel $typeMateriel)
    // {
    //     // Afficher le type de materiel
    //     try {
    //         // afficher le type de materiel
    //         $typemat = TypeMateriel::findOrFail($typeMateriel->id);
    //         return response()->json($typemat);
    //     } catch (Exception $e) {
    //         return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
    //     }
    // }
    public function show(string $id)
    {
        // Afficher le type de materiel
        try {
            // afficher le type de materiel
            $typemat = TypeMateriel::findOrFail($id);
            return response()->json($typemat);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypeMateriel $typeMateriel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'libelle' => 'required|string'
        ]);
        // Modifier un type de materiel
        try {
            $typemat = TypeMateriel::findOrFail($id);

                // $typemat->libelle = $request->libelle;
                // $typemat->telephone = $request->telephone;
                // $typemat->adresse = $request->adresse;
                // $typemat->idUser = $request->idUser;
                // $typemat->etat = 1;
                // $typemat->update();

                $typemat->update([
                    'libelle' => $request->libelle,
                ]);
            return response()->json($typemat);
        } catch (Exception $e) {
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Supprimer un type de materiel
       try {
        $typemat = TypeMateriel::findOrFail($id);
        if ($typemat!=null) {
            $typemat->delete();
        }
        return response()->json("Type de materiel supprimer avec success");
    } catch (Exception $e) {
        return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
    }
    }
}
