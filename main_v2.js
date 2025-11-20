const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем на весь экран

let selectedCategory = "";

// --- НАВИГАЦИЯ ПО ВКЛАДКАМ (Bottom Bar) ---
function switchTab(tabName) {
    // 1. Сбрасываем активность всех кнопок меню
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    // 2. Скрываем все экраны
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

    // 3. Активируем нужную вкладку
    if (tabName === 'home') {
        document.getElementById('screen-home').classList.add('active');
        // Находим кнопку Home и делаем активной (по индексу или селектору)
        document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else if (tabName === 'premium') {
        document.getElementById('screen-premium').classList.add('active');
        document.querySelectorAll('.nav-item')[1].classList.add('active');
    } else if (tabName === 'profile') {
        document.getElementById('screen-profile').classList.add('active');
        document.querySelectorAll('.nav-item')[2].classList.add('active');
    }
}

// --- ЛОГИКА ПРОВЕРКИ (Focus Mode) ---
function startFlow() {
    // Скрываем нижнюю панель, чтобы не отвлекала
    document.querySelector('.bottom-nav').classList.add('hidden');
    goToScreen('screen-instruction');
}

function goHome() {
    // Возвращаем нижнюю панель
    document.querySelector('.bottom-nav').classList.remove('hidden');
    switchTab('home');
}

function goToScreen(screenId) {
    // Утилита для переключения между экранами внутри процесса проверки
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById('cat-title').innerText = "Check: " + category;
    goToScreen('screen-upload');
}

// --- ЗАГРУЗКА ФОТО ---
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        dropZone.innerHTML = `<i class="fas fa-check" style="color: #00f2ff"></i> <p>${this.files.length} фото выбрано</p>`;
    }
});

function submitData() {
    if (!selectedCategory) {
        tg.showAlert("Ошибка: Категория не выбрана");
        return;
    }

    // Демонстрация отправки (в реале здесь отправка на сервер или боту)
    const data = {
        category: selectedCategory,
        action: "verification_request"
    };

    tg.sendData(JSON.stringify(data)); // Отправляем данные боту
}