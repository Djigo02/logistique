<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use PHPUnit\Exception;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class AuthController extends Controller
{
    /*
     * JWT. Json Web Token (JWT) est un standard très utilisé.
     * Il permet des échanges d'informations sécurisés à base de JSON.
 * Créer une méthode d'inscription dans AuthController
 */
    public function signup(Request $request){
        try{

            $user =  new User();
            $user->prenom = $request->prenom;
            $user->nom = $request->nom;
            $user->email = $request->email;
            $user->telephone = $request->telephone;
            $user->adresse = $request->adresse;
            $user->password = $request->password;
            $user->idRole = $request->idRole;
            $user->save();
            return response()->json(['message'=>"User Added", 'userData'=>$user,"statusCode"=>200]);

        }catch(Exception $e){
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }
    /*
    * Créer une méthode de login dans AuthController
     * identifiants de connexion (email et password) sont extraits de la requête HTTP
     * auth()->attempt($credentials) st utilisée pour tenter de s'authentifier avec les identifiants fournis.
     *  retourne un token  valide
     */
    public function login()
    {
        try {
            //
            $credentials = request(['email', 'password']);

            if (! $token = auth()->attempt($credentials)) {
                return response()->json(['error' => 'Failed Email or Password not matches!!'], 401);
            }
            return $this->respondWithToken($token);
        }catch(Exception $e){
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Obtenez la structure du tableau de jetons.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}
