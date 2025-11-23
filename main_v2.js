const tg = window.Telegram.WebApp;
tg.expand();

let currentCategory = "";

// 1. Логика нижней навигации
function switchTab(tabName) {
    document.querySelectorAll('.nav-icon').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

    if (tabName === 'home') {
        document.getElementById('screen-home').classList.add('active');
        document.querySelectorAll('.nav-icon')[1].classList.add('active');
        showNav(true);
        showHeader(true);
    } else if (tabName === 'profile') {
        document.getElementById('screen-profile').classList.add('active');
        document.querySelectorAll('.nav-icon')[0].classList.add('active');
        showNav(true);
        showHeader(false);
    } else if (tabName === 'premium') {
        document.getElementById('screen-premium').classList.add('active');
        document.querySelectorAll('.nav-icon')[3].classList.add('active');
        showNav(true);
        showHeader(false);
    } else if (tabName === 'history') {
        tg.showAlert("История пуста");
        switchTab('home'); 
    }
}

// 2. Логика переходов
function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'screen-home' || screenId === 'screen-profile' || screenId === 'screen-premium') {
        showNav(true);
    } else {
        showNav(false);
    }
    
    if (screenId === 'screen-home') {
        showHeader(true);
    } else {
        showHeader(false);
    }
}

function showNav(visible) {
    const nav = document.getElementById('main-nav');
    nav.style.display = visible ? 'flex' : 'none';
}

function showHeader(visible) {
    const header = document.getElementById('main-header');
    if (header) {
        header.style.display = visible ? 'block' : 'none';
    }
}

// 3. Выбор категории
function selectCategory(cat) {
    currentCategory = cat;
    goToScreen('screen-upload');
}

// 4. Логика Загрузки фото (НОВОЕ)
function triggerUpload(inputId) {
    // Находим скрытый input и кликаем по нему
    document.getElementById(inputId).click();
}

function previewImage(input, imgId, iconId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Показываем картинку
            const img = document.getElementById(imgId);
            img.src = e.target.result;
            img.style.display = 'block';

            // Показываем галочку
            const icon = document.getElementById(iconId);
            icon.style.display = 'block';
        }

        reader.readAsDataURL(input.files[0]);
    }
}

// 5. Оплата и финиш
function processPayment() {
    goToScreen('screen-success');
}

function finishFlow() {
    switchTab('home');
}

// Запуск
switchTab('home');