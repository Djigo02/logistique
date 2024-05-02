<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Exception;

class UserController extends Controller
{
    public function show(string $id)
    {
        $user=User::findOrFail($id);
        return response()->json(['message'=>"all User  ", 'UserData'=>$user,"statusCode"=>200]);
    }
    public function index()
    {
        $user=User::all();
        return response()->json(['message'=>"all User  ", 'UserData'=>$user,"statusCode"=>200]);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
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
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }
}
