<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AirportController;
use App\Http\Controllers\API\AirlineController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('airport', [AirportController::class, 'index']);
Route::post('/add-airport',[AirportController::class, 'store']);
Route::get('/edit-airport/{id}', [AirportController::class, 'edit']);
Route::put('/update-airport/{id}', [AirportController::class, 'update']);
Route::delete('/delete-airport/{id}', [AirportController::class, 'destroy']);

Route::get('/airline/{id}', [AirlineController::class, 'index']);
Route::get('/add-airline', [AirlineController::class, 'create']);
Route::post('/store-airline/{id}', [AirlineController::class, 'store']);
Route::get('/edit-airline/{id}', [AirlineController::class, 'edit']);
Route::put('/update-airline/{id}', [AirlineController::class, 'update']);
Route::delete('/delete-airline/{id}/{idd}', [AirlineController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
