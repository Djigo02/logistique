<?php

use App\Http\Controllers\CampusController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\MaterielController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\TypeMaterielController;
use App\Models\TypeMateriel;
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
    return "Bonjour";
});

/*
 * Créer une route d'inscription dans api.php
*/
Route::post('signup',[AuthController::class,'signup']);
Route::post('login',[AuthController::class,'login']);


Route::resource("users",UserController::class);
Route::resource("roles",RoleController::class);
Route::resource("logs",LogController::class);
Route::resource("campus",CampusController::class);
Route::resource('typesmateriels',TypeMaterielController::class);
Route::resource('salles',SalleController::class);
Route::resource('materiels',MaterielController::class);
Route::resource('fournisseurs',\App\Http\Controllers\FournisseurController::class);
Route::resource('affectations',\App\Http\Controllers\AffectationController::class);
