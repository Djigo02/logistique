<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get("api/", function(){
    return "Bonjour !";
});

/*
 * Créer une route d'inscription dans api.php
*/
Route::post('signup',[AuthController::class,'signup']);
Route::post('login',[AuthController::class,'login']);
Route::get('user/index',[UserController::class,'index']);
Route::post('user/update/{id}',[UserController::class,'update']);
Route::get('user/show/{id}',[UserController::class,'show']);
Route::post('user/destroy/{id}',[UserController::class,'destroy']);


Route::post('show',[AuthController::class,'show']);
Route::post('role/AddRole',[RoleController::class,'store']);
Route::post('role/updateRole/{id}',[RoleController::class,'update']);
Route::get('role/showRole/{id}',[RoleController::class,'show']);
Route::get('role/destroy/{id}',[RoleController::class,'destroy']);
