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
});
