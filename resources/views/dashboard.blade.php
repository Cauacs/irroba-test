@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Dashboard</h1>
    <p>Bem-vindo, {{ $user->name }} ({{ $user->especialidade }})</p>
    
    <div class="row mt-4">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Meus Agendamentos</div>
                <div class="card-body">
                    <div id="agendamentosList"></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Meus Pacientes</div>
                <div class="card-body">
                    <div id="pacientesList"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/login';
}

// Carregar agendamentos
fetch('/api/agendamentos', {
    headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const agendamentosList = document.getElementById('agendamentosList');
    if (data.length === 0) {
        agendamentosList.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
    } else {
        let html = '<ul class="list-group">';
        data.forEach(agendamento => {
            const date = new Date(agendamento.data_hora);
            html += `
                <li class="list-group-item">
                    <strong>${date.toLocaleString()}</strong><br>
                    Paciente: ${agendamento.paciente.nome}<br>
                    Status: ${agendamento.status}
                </li>
            `;
        });
        html += '</ul>';
        agendamentosList.innerHTML = html;
    }
});

// Carregar pacientes
fetch('/api/pacientes', {
    headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const pacientesList = document.getElementById('pacientesList');
    if (data.length === 0) {
        pacientesList.innerHTML = '<p>Nenhum paciente encontrado.</p>';
    } else {
        let html = '<ul class="list-group">';
        data.forEach(paciente => {
            html += `
                <li class="list-group-item">
                    <strong>${paciente.nome}</strong><br>
                    Email: ${paciente.email}<br>
                    Telefone: ${paciente.telefone}
                </li>
            `;
        });
        html += '</ul>';
        pacientesList.innerHTML = html;
    }
});
</script>
@endsection
