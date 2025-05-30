const API_BASE = 'http://localhost/api'; // ajuste conforme seu ambiente

// Logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Buscar agendamentos
async function fetchAppointments() {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE}/agendamentos`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        const ul = document.getElementById('appointmentsList');
        ul.innerHTML = '';
        if (data.length) {
	    console.log(data)
            data.forEach(a => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${a.paciente.name} - ${a.data_hora} - ${a.observacoes}
                    <button onclick="deleteAppointment(${a.id})">Cancelar</button>
                `;
                ul.appendChild(li);
            });
        } else {
            const h = document.createElement('h3');
            h.textContent = "Sem agendamentos";
            ul.appendChild(h);
        }
    });
}

async function deleteAppointment(id) {
    if (!confirm("Deseja realmente cancelar este agendamento?")) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/agendamentos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
        alert('Agendamento cancelado com sucesso!');
        fetchAppointments();
    } else {
        alert('Erro ao cancelar agendamento');
    }
}

// Buscar pacientes
async function fetchPacientes() {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE}/pacientes`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        loadPacientesForSelect(data);
        const ul = document.getElementById('patientsList');
        ul.innerHTML = '';
        if (data.length) {
            data.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${p.name} (${p.email})
                    <button onclick="deletePatient(${p.id})">Excluir</button>
                `;
                ul.appendChild(li);
            });
        } else {
            const h = document.createElement('h3');
            h.textContent = "Sem pacientes";
            ul.appendChild(h);
        }
    });
}

async function deletePatient(id) {
    if (!confirm("Deseja realmente excluir este paciente?")) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE}/pacientes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
        alert('Paciente excluído com sucesso!');
        fetchPacientes();
    } else {
        alert('Erro ao excluir paciente');
    }
}

function loadPacientesForSelect(data) {
    const select = document.getElementById('paciente_id');
    select.innerHTML = ''; // limpa opções antigas
    data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Logout button
    if (document.getElementById('logoutBtn')) {
        document.getElementById('logoutBtn').addEventListener('click', logout);
    }

    // Fetch lists if elements exist
    if (document.getElementById('appointmentsList')) {
        fetchAppointments();
    }

    if (document.getElementById('patientsList')) {
        fetchPacientes();
    }

    // Patient form submit
    const patientForm = document.getElementById('patientForm');
    if (patientForm) {
        patientForm.addEventListener('submit', async e => {
            e.preventDefault();
            const token = localStorage.getItem('token');

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const data_nascimento = document.getElementById('data_nascimento').value;
            const cpf = document.getElementById('cpf').value;

            try {
                const res = await fetch(`${API_BASE}/pacientes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        telefone,
                        data_nascimento,
                        cpf
                    }),
                });

                if (res.ok) {
                    alert('Paciente cadastrado com sucesso!');
                    patientForm.reset();
                    fetchPacientes();
                } else {
                    const error = await res.json();
                    alert('Erro ao cadastrar: ' + (error.message || 'Verifique os dados'));
                }
            } catch (err) {
                alert('Erro: ' + err.message);
            }
        });
    }

    // Appointment form submit
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async e => {
            e.preventDefault();
            const token = localStorage.getItem('token');

            const paciente_id = document.getElementById('paciente_id').value;
            const data_hora = document.getElementById('data_hora').value;
            const observacoes = document.getElementById('observacoes').value;

            try {
                const res = await fetch(`${API_BASE}/agendamentos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ paciente_id, data_hora, observacoes }),
                });

                if (res.ok) {
                    alert('Consulta agendada com sucesso!');
                    appointmentForm.reset();
                    fetchAppointments();
                } else if (res.status === 409) {
                    const error = await res.json();
                    alert(error.error || 'Conflito de horário.');
                } else {
                    const error = await res.json();
                    alert('Erro ao agendar: ' + (error.message || 'Verifique os dados'));
                }
            } catch (err) {
                alert('Erro: ' + err.message);
            }
        });
    }
});
