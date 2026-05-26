const pages = {
    home: `<h1>SYSTEM_DASHBOARD</h1><div class="card">ХАБ ГОТОВ К РАБОТЕ</div>`,
    gen: `<h1>Генератор</h1><div class="card"><input id="pass" readonly><button onclick="gen()">GENERATE</button></div>`,
    notes: `<h1>Заметки</h1><div class="card"><textarea id="noteInput" oninput="saveNote()" placeholder="Пиши сюда..."></textarea></div>`,
    bookmarks: `<h1>Закладки</h1><div class="card"><input type="text" id="urlInput" placeholder="https://..."><button onclick="addBookmark()">ДОБАВИТЬ</button><div id="bookmarkList"></div></div>`
};

function gen() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 16; i++) { password += chars.charAt(Math.floor(Math.random() * chars.length)); }
    document.getElementById("pass").value = password;
}

function saveNote() {
    localStorage.setItem('myNotes', document.getElementById('noteInput').value);
}

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
    if (container) container.innerHTML = list.map(url => `<a href="${url}" target="_blank" style="display:block; margin: 10px 0; color:var(--matrix-green);">${url}</a>`).join('');
}

function showPage(page) {
    const app = document.getElementById('app');
    app.innerHTML = pages[page] || pages.home;
    if (page === 'notes') document.getElementById('noteInput').value = localStorage.getItem('myNotes') || '';
    if (page === 'bookmarks') renderBookmarks();
    document.getElementById('menu-content').classList.add('hidden');
}

document.getElementById('menu-btn').onclick = () => document.getElementById('menu-content').classList.toggle('hidden');

showPage('home');
