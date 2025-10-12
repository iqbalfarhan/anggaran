<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TransaksiController;
use Illuminate\Support\Facades\Route;

Route::post('login', [UserController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', [UserController::class, 'user'])->name('get-user');
    Route::post('/profile', [UserController::class, 'profile'])->name('profile');
    Route::apiResource('project', ProjectController::class);
    Route::apiResource('transaksi', TransaksiController::class)->except(['index']);
});

