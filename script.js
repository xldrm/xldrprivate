const pages = {
    home: `<h1>SYSTEM_DASHBOARD</h1><div class="card">ХАБ ГОТОВ К РАБОТЕ</div>`,
    gen: `<h1>Генератор</h1><div class="card"><input id="pass" readonly><button onclick="gen()">GENERATE</button></div>`,
    notes: `<h1>Заметки</h1><div class="card"><textarea id="noteInput" oninput="saveNote()" placeholder="Пиши сюда..."></textarea></div>`, // <--- ЗАПЯТАЯ ЗДЕСЬ ОБЯЗАТЕЛЬНА!
    bookmarks: `<h1>Закладки</h1><div class="card"><input type="text" id="urlInput" placeholder="https://..."><button onclick="addBookmark()">ДОБАВИТЬ</button><div id="bookmarkList"></div></div>`
};

function addBookmark() {
    const url = document.getElementById('urlInput').value;
    if (!url) return;
    let list = JSON.parse(localStorage.getItem('myBookmarks') || '[]');
    list.push(url);
    localStorage.setItem('myBookmarks', JSON.stringify(list));
    renderBookmarks();
}

function renderBookmarks() {
    const list = JSON.parse(localStorage.getItem('myBookmarks') || '[]');
    const container = document.getElementById('bookmarkList');
    if (!container) return;
    container.innerHTML = list.map(url => `<a href="${url}" target="_blank" style="display:block; margin: 10px 0;">${url}</a>`).join('');
}

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
    
    if (page === 'notes') {
        document.getElementById('noteInput').value = localStorage.getItem('myNotes') || '';
    } else if (page === 'bookmarks') {
        renderBookmarks();
    }
    document.getElementById('menu-content').classList.add('hidden');
}    
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
