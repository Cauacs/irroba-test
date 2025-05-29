<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $pacientes = Paciente::all();

        // This should be in the agendamento controller
        // $pacientes = Paciente::whereHas('agendamentos', function($query) use ($medic) {
        //     $query->where('medico_id', $medic->id);
        // })->get();

        return response()->json($pacientes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:pacientes',
            'telefone' => 'required',
            'data_nascimento' => 'required|date',
            'cpf' => 'required|unique:pacientes',
            
        ]);

        $paciente = Paciente::create($request->all());

        return response()->json($paciente, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        return response()->json($paciente);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paciente $paciente)
    {
        $request->validate([
            'name' => 'required_without_all:telefone,email',
            'telefone' => 'required_without_all:name,data_nascimento',
            'data_nascimento' => 'required_without_all:name,telefone|date',
        ]);
 
        $paciente->update($request->all());

        return response()->json($paciente);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente)
    {
        $paciente->delete();

        return response()->json(['message' => 'Paciente deleted successfully'], 204);
    }
}
