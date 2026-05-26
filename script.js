// Объявляем объект pages ОДИН РАЗ
const pages = {
    home: `<h1>SYSTEM_DASHBOARD</h1><div class="card">ХАБ ГОТОВ К РАБОТЕ</div>`,
    gen: `<h1>Генератор</h1><div class="card"><input id="pass" readonly><button onclick="gen()">GENERATE</button></div>`,
    notes: `<h1>Заметки</h1><div class="card"><textarea id="noteInput" oninput="saveNote()" placeholder="Пиши сюда..."></textarea></div>`
};

function gen() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("pass").value = password;
}

function saveNote() {
    const text = document.getElementById('noteInput').value;
    localStorage.setItem('myNotes', text);
}

function showPage(page) {
    const app = document.getElementById('app');
    app.innerHTML = pages[page] || pages.home;
    
    // Если открыли заметки, подгружаем текст из памяти
    if (page === 'notes') {
        const saved = localStorage.getItem('myNotes');
        document.getElementById('noteInput').value = saved || '';
    }
    document.getElementById('menu-content').classList.add('hidden');
}

// Меню
document.getElementById('menu-btn').onclick = () => {
    document.getElementById('menu-content').classList.toggle('hidden');
};

// Запуск при старте
showPage('home');
