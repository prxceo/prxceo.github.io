const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let currentCategory = null;

// --- НАВИГАЦИЯ ---
function goToScreen(screenId) {
    // 1. Скрываем все экраны
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // 2. Показываем нужный
    document.getElementById(screenId).classList.add('active');

    // 3. Управление видимостью Хедера и Футера
    const tabBar = document.querySelector('.tab-bar');
    const header = document.querySelector('header');

    // Список экранов, где видим меню (Главная, Профиль, Премиум)
    const menuScreens = ['screen-home', 'screen-profile', 'screen-premium'];

    if (menuScreens.includes(screenId)) {
        // Показываем меню и хедер
        tabBar.classList.remove('hidden');
        if(header) header.classList.remove('hidden');
    } else {
        // Скрываем меню и хедер (режим фокуса)
        tabBar.classList.add('hidden');
        if(header) header.classList.add('hidden');
    }

    // Подсветка иконок
    document.querySelectorAll('.tab-item').forEach(item => item.classList.remove('active'));
    
    if (screenId === 'screen-profile') document.querySelectorAll('.tab-item')[0].classList.add('active');
    if (screenId === 'screen-home') document.querySelectorAll('.tab-item')[1].classList.add('active');
    if (screenId === 'screen-premium') document.querySelectorAll('.tab-item')[2].classList.add('active');

    if (screenId === 'screen-home') resetSelection();
}

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
    const btn = document.getElementById('next-btn-cat');
    if(btn) btn.classList.remove('visible');
}

// Логика кнопки "CONTINUE" (Заглушка платежа)
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('next-btn-cat');
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            tg.showInvoice({
                title: `Check: ${currentCategory}`,
                description: 'Authenticity Check',
                payload: 'test-pay',
                currency: 'XTR',
                prices: [{ label: 'Expert Check', amount: 200 }]
            }, (status) => {
                if (status === 'paid') { tg.sendData('paid_success'); tg.close(); }
            });
        });
    }
    
    // Имя пользователя
    const user = tg.initDataUnsafe.user;
    if (user && document.getElementById('user-name')) {
        document.getElementById('user-name').textContent = user.first_name;
    }
});