const tg = window.Telegram.WebApp;
tg.expand();

let currentCategory = "";
let uploadedFiles = []; // Храним файлы здесь

// --- 1. КАТЕГОРИИ ---

function selectItem(element, categoryName) {
    // 1. Убираем выделение со всех
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('selected'));
    
    // 2. Выделяем текущий
    element.classList.add('selected');
    currentCategory = categoryName;

    // 3. Активируем кнопку "Далее" (Стрелку)
    const nextBtn = document.getElementById('cat-next-btn');
    nextBtn.classList.remove('disabled');
    nextBtn.classList.add('active');
    
    // Haptic
    tg.HapticFeedback.impactOccurred('light');
}

function goToUploadIfSelected() {
    if (currentCategory) {
        goToScreen('screen-upload');
    }
}

// --- 2. ЗАГРУЗКА ФОТО (BULK) ---

function handleBulkUpload(input) {
    const files = Array.from(input.files);
    
    // Проверка: не больше 10 фото всего
    if (uploadedFiles.length + files.length > 10) {
        tg.showAlert("Максимум 10 фотографий!");
        return;
    }

    // Добавляем файлы в массив
    uploadedFiles = uploadedFiles.concat(files);
    
    renderGallery();
}

function renderGallery() {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = ""; // Очищаем

    // Рисуем превью
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
    counterText.innerText = `Загружено: ${count}/10`;

    // Логика кнопки оплаты (Мин 6, Макс 10)
    const payBtn = document.getElementById('pay-btn');
    if (count >= 6 && count <= 10) {
        payBtn.classList.remove('disabled');
        counterText.style.color = '#30d158'; // Зеленый
    } else {
        payBtn.classList.add('disabled');
        if (count > 10) counterText.style.color = 'red';
        else counterText.style.color = '#666';
    }
}

// --- 3. СТАНДАРТНАЯ НАВИГАЦИЯ ---

function switchTab(tabName) {
    document.querySelectorAll('.nav-icon').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

    if (tabName === 'home') {
        document.getElementById('screen-home').classList.add('active');
        document.querySelectorAll('.nav-icon')[1].classList.add('active');
        showNav(true); showHeader(true);
    } else if (tabName === 'profile') {
        document.getElementById('screen-profile').classList.add('active');
        document.querySelectorAll('.nav-icon')[0].classList.add('active');
        showNav(true); showHeader(false);
    } else if (tabName === 'premium') {
        document.getElementById('screen-premium').classList.add('active');
        document.querySelectorAll('.nav-icon')[3].classList.add('active');
        showNav(true); showHeader(false);
    } else if (tabName === 'history') {
        tg.showAlert("История пуста");
        switchTab('home'); 
    }
}

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'screen-home' || screenId === 'screen-profile' || screenId === 'screen-premium') {
        showNav(true);
    } else {
        showNav(false);
    }
    
    if (screenId === 'screen-home') showHeader(true);
    else showHeader(false);
}

function showNav(visible) { document.getElementById('main-nav').style.display = visible ? 'flex' : 'none'; }
function showHeader(visible) { 
    const h = document.getElementById('main-header'); 
    if(h) h.style.display = visible ? 'block' : 'none'; 
}

function processPayment() {
    if (uploadedFiles.length < 6) {
        tg.showAlert("Минимум 6 фото!");
        return;
    }
    goToScreen('screen-success');
}

function finishFlow() {
    // Сброс данных после успеха
    uploadedFiles = [];
    currentCategory = "";
    document.getElementById('photo-gallery').innerHTML = "";
    document.getElementById('cat-next-btn').classList.add('disabled');
    document.getElementById('cat-next-btn').classList.remove('active');
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('selected'));
    
    switchTab('home');
}

switchTab('home');