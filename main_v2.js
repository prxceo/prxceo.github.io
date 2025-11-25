const tg = window.Telegram.WebApp;
tg.expand();

let currentCategory = "";
let uploadedFiles = [];

// 1. КАТЕГОРИИ
function selectItem(element, categoryName) {
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    currentCategory = categoryName;

    const nextBtn = document.getElementById('cat-next-btn');
    nextBtn.classList.remove('disabled');
    nextBtn.classList.add('active');
    tg.HapticFeedback.impactOccurred('light');
}

function goToUploadIfSelected() {
    if (currentCategory) goToScreen('screen-upload');
}

// 2. ЗАГРУЗКА
function handleBulkUpload(input) {
    const files = Array.from(input.files);
    if (uploadedFiles.length + files.length > 10) {
        tg.showAlert("Максимум 10 фотографий!");
        return;
    }
    uploadedFiles = uploadedFiles.concat(files);
    renderGallery();
}

function renderGallery() {
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = "";
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
    
    const count = uploadedFiles.length;
    const counterText = document.getElementById('photo-counter');
    counterText.innerText = `Загружено: ${count}/10`;

    const payBtn = document.getElementById('pay-btn');
    if (count >= 6 && count <= 10) {
        payBtn.classList.remove('disabled');
        counterText.style.color = '#30d158';
    } else {
        payBtn.classList.add('disabled');
        counterText.style.color = count > 10 ? 'red' : '#666';
    }
}

// 3. НАВИГАЦИЯ
function switchTab(tabName) {
    document.querySelectorAll('.nav-icon').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

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
}

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    // Показываем меню только на главных экранах
    if (screenId === 'screen-home' || screenId === 'screen-profile' || screenId === 'screen-premium' || screenId === 'screen-history') {
        showNav(true);
    } else {
        showNav(false);
    }
}

function showNav(visible) { document.getElementById('main-nav').style.display = visible ? 'flex' : 'none'; }

// 4. ОТПРАВКА (ПОКА ЗАГЛУШКА БЕЗ СЕРВЕРА)
async function processPayment() {
    if (uploadedFiles.length < 6) {
        tg.showAlert("Минимум 6 фото!");
        return;
    }
    // Здесь будет код отправки на сервер
    goToScreen('screen-success');
}

function finishFlow() {
    uploadedFiles = [];
    currentCategory = "";
    document.getElementById('photo-gallery').innerHTML = "";
    document.getElementById('photo-counter').innerText = "Загружено: 0/10";
    document.getElementById('cat-next-btn').classList.add('disabled');
    document.getElementById('cat-next-btn').classList.remove('active');
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('selected'));
    switchTab('home');
}

switchTab('home');