const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let currentCategory = null;

// --- ГЛАВНАЯ ФУНКЦИЯ НАВИГАЦИИ ---
function goToScreen(screenId) {
    // 1. Скрываем текущие экраны
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // 2. Показываем новый
    document.getElementById(screenId).classList.add('active');

    // 3. Логика "Focus Mode" (Скрываем Tab Bar)
    const tabBar = document.querySelector('.tab-bar');
    const mainScreens = ['screen-home']; // Экраны, где бар ВИДЕН

    if (mainScreens.includes(screenId)) {
        tabBar.classList.remove('hidden');
    } else {
        tabBar.classList.add('hidden');
    }

    // Если вернулись домой, сбрасываем выбор
    if (screenId === 'screen-home') {
        resetSelection();
    }
}

// --- ВЫБОР КАТЕГОРИИ ---
function selectCategory(categoryName, element) {
    currentCategory = categoryName;

    // Сбрасываем старый выбор
    document.querySelectorAll('.grid-item').forEach(item => {
        item.classList.remove('selected');
    });

    // Подсвечиваем новый
    element.classList.add('selected');

    // Показываем кнопку Continue
    const nextBtn = document.getElementById('next-btn-cat');
    nextBtn.classList.add('visible');
    
    if(tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// --- СБРОС ВЫБОРА ---
function resetSelection() {
    currentCategory = null;
    document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('selected'));
    document.getElementById('next-btn-cat').classList.remove('visible');
}

// --- ОПЛАТА ---
function processSelection() {
    if (!currentCategory) return;

    tg.showInvoice({
        title: `Check: ${currentCategory}`,
        description: `Authenticity check for ${currentCategory}`,
        payload: `prx-${currentCategory}-v1`,
        currency: 'XTR',
        prices: [{ label: 'PRX Expert Check', amount: 200 }]
    }, (status) => {
        if (status === 'paid') {
            tg.sendData('paid_success');
            tg.close();
        }
    });
}

// --- СЛУШАТЕЛИ ---
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('next-btn-cat');
    if(nextBtn) {
        nextBtn.addEventListener('click', processSelection);
    }
});