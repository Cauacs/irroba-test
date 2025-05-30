<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/', function (){
    return inertia('Home');
})->name('welcome');

Route::get('/login', function (){
    return inertia('Login');
})->name('login');

Route::get('/register', function(){
    return inertia('Register');
})->name('register');

Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->name('dashboard');

Route::get('/agendamentos', function() {
    return inertia('Agendamentos');
})->name('agendamentos');

Route::get('/agendamentos/new', function() {
    return inertia('NewAgendamento');
})->name('newAgendamentos');

Route::get('/pacientes', function() {
    return inertia('Pacientes');
})->name('pacientes');

Route::get('/pacientes/new', function() {
    return inertia('NewPaciente');
})->name('newPaciente');
