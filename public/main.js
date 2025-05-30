const API_BASE = 'http://localhost/api'; // ajuste conforme seu ambiente

// Função de login
async function login(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
	localStorage.setItem('token', data.success.token);
	window.location.href = 'dashboard.html';
    } else {
	alert(data.message || 'Falha no login');
    }
}

// Função para buscar agendamentos
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
		data.forEach(a => {
		    const li = document.createElement('li');
		    li.innerHTML = `
          ${a.paciente.name} - ${a.data_hora} - ${a}
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

// Função para buscar pacientes
async function fetchPacientes() {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE}/pacientes`, {
	headers: { Authorization: `Bearer ${token}` }
    })
	.then(res => res.json())
	.then(data => {
	    loadPacientesForSelect(data)
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

// Função logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('loginForm')) {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      login(email, password);
    });
  }

  if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', logout);
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const c_password = document.getElementById('c_password').value;
      const telefone = document.getElementById('telefone').value;
      const crm = document.getElementById('crm').value;

      register(name, email, password, c_password, telefone, crm);
    });
  }

  if (document.getElementById('appointmentsList')) {
    fetchAppointments();
  }

  if (document.getElementById('patientsList')) {
    fetchPacientes();
  }
});


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
	    fetchPacientes(); // Atualiza a lista de pacientes
	} else {
	    const error = await res.json();
	    alert('Erro ao cadastrar: ' + (error.message || 'Verifique os dados'));
	}
    } catch (err) {
	alert('Erro: ' + err.message);
    }
});

function loadPacientesForSelect(data) {
    const select = document.getElementById('paciente_id');
    data.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
    });
    
}

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
            fetchAppointments(); // Opcional, recarrega lista
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
})

async function register(name, email, password, c_password, telefone, crm) {
    try {
	const res = await fetch(`${API_BASE}/register`, {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({
		name,
		email,
		password,
		c_password,
		telefone,
		crm
	    })
	});

	const data = await res.json();

	if (res.ok) {
	    alert('Cadastro realizado com sucesso!');
	    localStorage.setItem('token', data.success.token);
	    window.location.href = 'dashboard.html'; // ou redirecione para onde quiser
	}
	else {
	    console.error(data);
	    alert('Erro: ' + Object.values(data.error).flat().join('\n'));
	}}
    
    catch (err) {
	alert('Erro ao registrar: ' + err.message);
	
    }}
