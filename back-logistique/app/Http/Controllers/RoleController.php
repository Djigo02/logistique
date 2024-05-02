<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;
use PHPUnit\Exception;

class RoleController extends Controller
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
    public function store(StoreRoleRequest $request)
    {
        try {
            $role=new Role();
            $role->libelle = $request->libelle;
            $role->etat=1;
            $role->save();
            return response()->json(['message'=>"Role Added", 'roleData'=>$role,"statusCode"=>200]);
        }catch(Exception $e){
            return response()->json(['message'=>"Erreur"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role=Role::findOrFail($id);
        return response()->json(['message'=>"Role ", 'roleData'=>$role,"statusCode"=>200]);
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
            return response()->json(['message'=>"Erreur"]);
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
            return response()->json(['message'=>"Erreur"]);
        }
    }
}
