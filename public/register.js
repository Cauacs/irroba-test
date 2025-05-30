const API_BASE = 'http://localhost/api'; // ajuste conforme seu ambiente

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
            window.location.href = 'dashboard.html';
        }
        else {
            console.error(data);
            alert('Erro: ' + Object.values(data.error).flat().join('\n'));
        }
    } catch (err) {
        alert('Erro ao registrar: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
});
