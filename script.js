function generatePassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("password").value = password;
}
const pages = {
    home: `<h1>SYSTEM_DASHBOARD</h1><div class="card">Привет, это главный хаб.</div>`,
    gen: `<h1>Генератор</h1><div class="card"><input id="pass" readonly><button onclick="gen()">GENERATE</button></div>`
};

function showPage(page) {
    document.getElementById('app').innerHTML = pages[page] || pages.home;
    document.getElementById('menu-content').classList.add('hidden');
}

document.getElementById('menu-btn').onclick = () => {
    document.getElementById('menu-content').classList.toggle('hidden');
};

const pages = {
    home: `<h1>SYSTEM_DASHBOARD</h1><div class="card">ХАБ ГОТОВ К РАБОТЕ</div>`,
    gen: `<h1>Генератор</h1><div class="card"><input id="pass" readonly><button onclick="gen()">GENERATE</button></div>`,
    notes: `<h1>Заметки</h1><div class="card"><textarea id="noteInput" oninput="saveNote()" placeholder="Пиши сюда..."></textarea></div>`
};

// Функция сохранения в LocalStorage
function saveNote() {
    const text = document.getElementById('noteInput').value;
    localStorage.setItem('myNotes', text);
}

// Загрузка при открытии страницы
function showPage(page) {
    document.getElementById('app').innerHTML = pages[page] || pages.home;
    if (page === 'notes') {
        document.getElementById('noteInput').value = localStorage.getItem('myNotes') || '';
    }
    document.getElementById('menu-content').classList.add('hidden');
}
// Инициализация
showPage('home');
