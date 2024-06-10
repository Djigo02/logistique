<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Exception;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $role=Role::all();
            return response()->json(['message'=>"all role  ", 'RoleData'=>$role,"statusCode"=>200]);
        }catch (Exception $e){
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
    public function store(StoreRoleRequest $request)
    {
        try {
            $role=new Role();
            $role->libelle = $request->libelle;
            $role->etat=1;
            $role->save();
            return response()->json(['message'=>"Role Added", 'roleData'=>$role,"statusCode"=>200]);
        }catch(Exception $e){
            $log =new Log();
            $log->class = "Role";
            $log->controller = "RoleController";
            $log->methode = "store";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $role=Role::findOrFail($id);
            return response()->json(['message'=>"Role ", 'roleData'=>$role,"statusCode"=>200]);
        }catch(Exception $e){
            $log =new Log();
            $log->class = "Role";
            $log->controller = "RoleController";
            $log->methode = "show";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $role = Role::find($id);
            $role->libelle = $request->libelle;
            $role->etat=$request->etat;
            $role->update();
            return response()->json(['message'=>"Role Update", 'roleData'=>$role,"statusCode"=>200]);
        }catch(Exception $e){
            $log =new Log();
            $log->class = "Role";
            $log->controller = "RoleController";
            $log->methode = "update";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $role = Role::find($id);
            $role->delate();
            return response()->json(['message'=>"Role delate","statusCode"=>200]);
        }catch(Exception $e){
            $log =new Log();
            $log->class = "Role";
            $log->controller = "RoleController";
            $log->methode = "destroy";
            $log->message = $e->getMessage();
            return response()->json("Une erreur innattendu s'est produite ".$e->getMessage());
        }
    }
}
