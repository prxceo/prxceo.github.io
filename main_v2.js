const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let currentCategory = null;

// --- ГЛАВНАЯ ФУНКЦИЯ НАВИГАЦИИ ---
function goToScreen(screenId) {
    // 1. Переключаем экраны
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    // 2. Focus Mode (Скрываем/Показываем Таббар)
    const tabBar = document.querySelector('.tab-bar');
    // Экраны, где панель ВИДНА
    const mainScreens = ['screen-home', 'screen-plans', 'screen-profile', 'screen-premium'];

    if (mainScreens.includes(screenId)) {
        tabBar.classList.remove('hidden');
    } else {
        tabBar.classList.add('hidden');
    }

    // 3. Подсветка иконки в Таббаре
    document.querySelectorAll('.tab-item').forEach(item => item.classList.remove('active'));
    
    // Индексы иконок: 0-Профиль, 1-Дом, 2-История, 3-Премиум
    if (screenId === 'screen-profile') document.querySelectorAll('.tab-item')[0].classList.add('active');
    if (screenId === 'screen-home') document.querySelectorAll('.tab-item')[1].classList.add('active');
    if (screenId === 'screen-plans') document.querySelectorAll('.tab-item')[2].classList.add('active');
    if (screenId === 'screen-premium') document.querySelectorAll('.tab-item')[3].classList.add('active');

    // Сброс выбора категории, если вернулись домой
    if (screenId === 'screen-home') resetSelection();
}

// --- ВЫБОР КАТЕГОРИИ ---
function selectCategory(categoryName, element) {
    currentCategory = categoryName;
    document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById('next-btn-cat').classList.add('visible');
    if(tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function resetSelection() {
    currentCategory = null;
    document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('selected'));
    const nextBtn = document.getElementById('next-btn-cat');
    if(nextBtn) nextBtn.classList.remove('visible');
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

// --- ИНИЦИАЛИЗАЦИЯ И ДАННЫЕ ЮЗЕРА ---
document.addEventListener('DOMContentLoaded', () => {
    // Клик по кнопке "Continue"
    const nextBtn = document.getElementById('next-btn-cat');
    if(nextBtn) nextBtn.addEventListener('click', processSelection);

    // Получаем имя пользователя из Telegram
    const user = tg.initDataUnsafe.user;
    if (user) {
        const nameElement = document.getElementById('user-name');
        if (nameElement) {
            // Берем имя, если фамилии нет - только имя
            nameElement.textContent = user.first_name + (user.last_name ? " " + user.last_name : "");
        }
    }
});