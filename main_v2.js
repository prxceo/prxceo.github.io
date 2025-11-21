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
    } else if (tabName === 'profile') {
        document.getElementById('screen-profile').classList.add('active');
        document.querySelectorAll('.nav-icon')[0].classList.add('active');
        showNav(true);
    } else if (tabName === 'premium') {
        document.getElementById('screen-premium').classList.add('active');
        document.querySelectorAll('.nav-icon')[3].classList.add('active');
        showNav(true);
    } else if (tabName === 'history') {
        // Историю пока оставим пустой или сделаем заглушку
        alert("Раздел истории в разработке");
        switchTab('home'); 
    }
}

// 2. Логика переходов внутри процесса проверки (Flow)
function goToScreen(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    // Показываем целевой экран
    document.getElementById(screenId).classList.add('active');

    // Если мы внутри процесса проверки, скрываем нижнее меню
    if (screenId === 'screen-home' || screenId === 'screen-profile' || screenId === 'screen-premium') {
        showNav(true);
    } else {
        showNav(false);
    }
}

function showNav(visible) {
    const nav = document.getElementById('main-nav');
    nav.style.display = visible ? 'flex' : 'none';
}

// 3. Выбор категории
function selectCategory(cat) {
    currentCategory = cat;
    // Визуально можно выделить (пока просто переход)
    // alert("Выбрано: " + cat); 
    // В эскизе нет явного перехода сразу, там кнопка со стрелкой.
    // Но сделаем, что клик по иконке подсвечивает её (можно доработать CSS), пока просто перекинем.
    goToScreen('screen-upload');
}

// 4. Оплата и финиш
function processPayment() {
    // Здесь будет логика Stars, пока просто имитация
    goToScreen('screen-success');
}

function finishFlow() {
    switchTab('home');
}

// Запуск
switchTab('home');