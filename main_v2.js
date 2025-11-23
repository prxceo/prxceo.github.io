const tg = window.Telegram.WebApp;
tg.expand();

let currentCategory = "";

// 1. Логика нижней навигации (Tab Bar)
function switchTab(tabName) {
    // Убираем активный класс с иконок
    document.querySelectorAll('.nav-icon').forEach(el => el.classList.remove('active'));
    
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

    // Показываем нужный
    if (tabName === 'home') {
        document.getElementById('screen-home').classList.add('active');
        document.querySelectorAll('.nav-icon')[1].classList.add('active');
        showNav(true);
        showHeader(true);
    } else if (tabName === 'profile') {
        document.getElementById('screen-profile').classList.add('active');
        document.querySelectorAll('.nav-icon')[0].classList.add('active');
        showNav(true);
        showHeader(false); // В профиле логотип можно скрыть или оставить, пока скроем
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

// 2. Логика переходов по экранам (Flow)
function goToScreen(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    // Показываем целевой экран
    document.getElementById(screenId).classList.add('active');

    // ЛОГИКА ОТОБРАЖЕНИЯ НИЖНЕГО МЕНЮ
    // Если мы на главных вкладках (Home, Profile, Premium) - меню есть.
    // Если мы внутри проверки или в Инструкции - меню нет.
    if (screenId === 'screen-home' || screenId === 'screen-profile' || screenId === 'screen-premium') {
        showNav(true);
    } else {
        showNav(false);
    }
    
    // Логотип показываем только на Home (по желанию)
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

// 4. Оплата и финиш
function processPayment() {
    goToScreen('screen-success');
}

function finishFlow() {
    switchTab('home');
}

// Запуск приложения
switchTab('home');