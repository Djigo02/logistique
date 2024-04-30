<?php

use App\Http\Controllers\CampusController;
use App\Http\Controllers\TypeMaterielController;
use App\Models\TypeMateriel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::resource("campus",CampusController::class);
Route::resource('typesmateriels',TypeMaterielController::class);