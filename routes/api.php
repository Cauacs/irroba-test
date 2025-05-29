<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\AgendamentoController;

Route::get('hello', function() {
    return response()->json(['message' => 'Hello world']);
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('user', [AuthController::class, 'userDetails']);
    
    // User CRUD routes
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    // Paciente CRUD routes
    Route::get('pacientes', [PacienteController::class, 'index']);
    Route::get('pacientes/{paciente}', [PacienteController::class, 'show']);
    Route::post('pacientes', [PacienteController::class, 'store']);
    Route::put('pacientes/{paciente}', [PacienteController::class, 'update']);
    Route::delete('pacientes/{paciente}', [PacienteController::class, 'destroy']);

    // Agendamento CRUD routes
    Route::get('agendamentos', [AgendamentoController::class, 'index']);
    Route::get('agendamentos/{agendamento}', [AgendamentoController::class, 'show']);
    Route::post('agendamentos', [AgendamentoController::class, 'store']);
    Route::put('agendamentos/{agendamento}', [AgendamentoController::class, 'update']);
    Route::delete('agendamentos/{agendamento}', [AgendamentoController::class, 'destroy']);
});
