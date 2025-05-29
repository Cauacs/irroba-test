<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AgendamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Select only those with the same medico_id
        $agendamentos = Agendamento::with(['paciente', 'medico'])
            ->where('medico_id', Auth::id())
            ->orderBy('data_hora', 'asc')
            ->get();

        return response()->json($agendamentos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required|exists:pacientes,id',
            'data_hora' => 'required|date',
            'observacoes' => 'nullable',
        ]);

        // Verificar conflito de horário
        $dataHora = Carbon::parse($request->data_hora);
        $existeAgendamento = Agendamento::where('medico_id', Auth::id())
            ->where('data_hora', $dataHora)
            ->exists();

        if ($existeAgendamento) {
            return response()->json([
                'error' => 'Já existe um agendamento para este horário'
            ], 409);
        }

        $agendamento = Agendamento::create([
            'medico_id' => Auth::id(),
            'paciente_id' => $request->paciente_id,
            'data_hora' => $dataHora,
            'observacoes' => $request->observacoes,
            'status' => 'agendado',
        ]);

        return response()->json($agendamento, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Agendamento $agendamento)
    {
        if ($agendamento->medico_id !== Auth::id()) {
            return response()->json(['error' => 'Acesso não autorizado'], 403);
        }

        return response()->json($agendamento->load(['paciente', 'medico']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agendamento $agendamento)
    {
        if ($agendamento->medico_id !== Auth::id()) {
            return response()->json(['error' => 'Acesso não autorizado'], 403);
        }

        $request->validate([
            'data_hora' => 'date|required_without_all:observacoes,status',
            'observacoes' => 'required_without_all:data_hora,status',
            'status' => 'required_without_all:data_hora,observacoes|in:agendado,cancelado,realizado'
        ]);

        // Verificar conflito de horário (exceto com ele mesmo)
        $dataHora = Carbon::parse($request->data_hora);
        $existeAgendamento = Agendamento::where('medico_id', Auth::id())
            ->where('data_hora', $dataHora)
            ->where('id', '!=', $agendamento->id)
            ->exists();

        if ($existeAgendamento) {
            return response()->json([
                'error' => 'Já existe um agendamento para este horário'
            ], 409);


        }
        // $agendamento->update([
        //     'data_hora' => $dataHora,
        //     'observacoes' => $request->observacoes,
        //     'status' => $request->status,
        // ]);

        $agendamento->update($request->all());
        

        return response()->json($agendamento);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agendamento $agendamento)
    {
        if ($agendamento->medico_id !== Auth::id()) {
            return response()->json(['error' => 'Acesso não autorizado'], 403);
        }

        $agendamento->delete();

        return response()->json(['message' => 'Deleted sucessfully'], 204);
        
    }
}
