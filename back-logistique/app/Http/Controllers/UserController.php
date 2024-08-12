<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Exception;

class UserController extends Controller
{
    public function show(string $id)
    {

        try{
            $user=User::findOrFail($id);
            return response()->json($user);
        }catch(Exception $e){
            $log =new Log();
            $log->class = "User";
            $log->controller = "UserController";
            $log->methode = "refresh";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    public function index()
    {
        $user=User::all();
        return response()->json($user);
    }


    public function refresh()
    {
        try{
            return $this->respondWithToken(auth()->refresh());
        }catch(Exception $e){
            $log =new Log();
            $log->class = "User";
            $log->controller = "UserController";
            $log->methode = "refresh";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

        /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Création d'un nouveau utilisateur
        $request->validate([
            'prenom' => 'required|string',
            'nom' => 'required|string',
            'email' => 'required|string|email',
            'telephone' => 'required|string|max:15',
            'adresse' => 'required|string',
            'idRole' => 'required'
        ]);
        try {
            // Enregistrer un nouveau utilisateur
            $user = new User();
            $user->prenom = $request->prenom;
            $user->nom = $request->nom;
            $user->email = $request->email;
            $user->telephone = $request->telephone;
            $user->adresse = $request->adresse;
            $user->password = "passer@123";
            $user->idRole = $request->idRole;
            $user->save();
            return response()->json($user);
        } catch (Exception $e) {
            $log =new Log();
            $log->class = "User";
            $log->controller = "UserController";
            $log->methode = "store";
            $log->message = $e->getMessage();
            return response()->json("Une erreur inattendue s'est produite : " . $e->getMessage());
        }
    }

    public function update(Request $request , int $id)
    {
        try{
            $user = User::find($id);
            $user->prenom = $request->prenom;
            $user->nom = $request->nom;
            $user->email = $request->email;
            $user->telephone = $request->telephone;
            $user->adresse = $request->adresse;
            $user->password = $request->password;
            $user->idRole = $request->idRole;
            $user->update();
            return response()->json(['message'=>"User Update", 'UserData'=>$user,"statusCode"=>200]);
        }catch(Exception $e){
            $log =new Log();
            $log->class = "User";
            $log->controller = "UserController";
            $log->methode = "update";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    public function destroy(string $id)
    {
        try{
            $user = User::find($id);
            $user->delete();
            return response()->json(['message'=>"User delete","statusCode"=>200]);
        }catch(Exception $e){
            $log =new Log();
            $log->class = "User";
            $log->controller = "UserController";
            $log->methode = "destroy";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }
}
