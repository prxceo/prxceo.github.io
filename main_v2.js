const tg = window.Telegram.WebApp;
tg.expand();

let currentCategory = "";
let uploadedFiles = [];

// --- 1. ЛОГИКА ВЫБОРА КАТЕГОРИИ ---

function selectItem(element, categoryName) {
    // Сбрасываем выделение со всех
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('selected'));
    
    // Выделяем текущий
    element.classList.add('selected');
    currentCategory = categoryName;

    // Активируем кнопку "Далее"
    const nextBtn = document.getElementById('cat-next-btn');
    if (nextBtn) {
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('active');
    }
    
    // Легкая вибрация
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

function goToUploadIfSelected() {
    if (currentCategory) {
        goToScreen('screen-upload');
    }
}

// --- 2. ЛОГИКА ЗАГРУЗКИ ФОТО (BULK) ---

function handleBulkUpload(input) {
    const files = Array.from(input.files);
    
    // Лимит 10 фото
    if (uploadedFiles.length + files.length > 10) {
        tg.showAlert("Максимум 10 фотографий!");
        return;
    }

    uploadedFiles = uploadedFiles.concat(files);
    renderGallery();
}

function renderGallery() {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = ""; // Очищаем

    uploadedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'gallery-img';
            gallery.appendChild(img);
        }
        reader.readAsDataURL(file);
    });

    // Обновляем счетчик
    const count = uploadedFiles.length;
    const counterText = document.getElementById('photo-counter');
    if (counterText) {
        counterText.innerText = `Загружено: ${count}/10`;
    
        // Меняем цвет текста
        if (count > 10) counterText.style.color = 'red';
        else if (count >= 6) counterText.style.color = '#30d158'; // Зеленый
        else counterText.style.color = '#666';
    }

    // Активация кнопки оплаты (Мин 6 фото)
    const payBtn = document.getElementById('pay-btn');
    if (payBtn) {
        if (count >= 6 && count <= 10) {
            payBtn.classList.remove('disabled');
        } else {
            payBtn.classList.add('disabled');
        }
    }
}

// --- 3. НАВИГАЦИЯ ---

function switchTab(tabName) {
    // Сброс стилей иконок
    document.querySelectorAll('.nav-icon').forEach(el => el.classList.remove('active'));
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

    // Логика переключения
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
        document.getElementById('screen-history').classList.add('active');
        document.querySelectorAll('.nav-icon')[2].classList.add('active');
        showNav(true);
    }
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.selectionChanged();
    }
}

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');

    // Нижнее меню показываем только на главных экранах
    const mainScreens = ['screen-home', 'screen-profile', 'screen-premium', 'screen-history'];
    if (mainScreens.includes(screenId)) {
        showNav(true);
    } else {
        showNav(false);
    }
}

function showNav(visible) {
    const nav = document.getElementById('main-nav');
    if (nav) nav.style.display = visible ? 'flex' : 'none';
}

// --- 4. ОТПРАВКА / ОПЛАТА ---

function processPayment() {
    if (uploadedFiles.length < 6) {
        tg.showAlert("Минимум 6 фото!");
        return;
    }
    // Пока просто переход на успех (Бэкенд подключим позже)
    goToScreen('screen-success');
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

function finishFlow() {
    // Сброс данных
    uploadedFiles = [];
    currentCategory = "";
    
    const gallery = document.getElementById('photo-gallery');
    if (gallery) gallery.innerHTML = "";
    
    const counter = document.getElementById('photo-counter');
    if (counter) counter.innerText = "Загружено: 0/10";
    
    // Сброс кнопок категорий
    const nextBtn = document.getElementById('cat-next-btn');
    if (nextBtn) {
        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('active');
    }
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('selected'));
    
    switchTab('home');
}

// Запуск приложения
switchTab('home');