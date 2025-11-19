// 1. Инициализируем Telegram WebApp
const tg = window.Telegram.WebApp;

// 2. Находим элементы на экране
const uploadButton = document.getElementById('upload-button');
const payButton = document.getElementById('pay-button');
const statusMessage = document.getElementById('status-message');

// 3. Сообщаем Телеграму, что приложение готово и расширяем его
tg.ready();
tg.expand(); 

// --- ЛОГИКА КНОПКИ "ЗАГРУЗИТЬ ФОТО" ---
uploadButton.addEventListener('click', () => {
    // Отправляем боту команду, что мы хотим загрузить фото
    tg.sendData('start_upload');
    // Закрываем Mini App, чтобы пользователь вернулся в чат
    tg.close();
});

// --- ЛОГИКА КНОПКИ "ОПЛАТИТЬ" (Telegram Stars) ---
payButton.addEventListener('click', () => {
    
    tg.showInvoice({
        title: 'PRX Legit Check',
        description: 'Полная проверка подлинности (1 шт)',
        payload: 'prx-legit-check-v1', 
        currency: 'XTR', // Валюта: Telegram Stars
        prices: [{ label: 'Проверка AI + Эксперт', amount: 200 }] // Цена: 200 звезд
    }, (status) => {
        // Проверяем статус оплаты
        if (status === 'paid') {
            statusMessage.textContent = 'Оплата прошла! Переходим в чат...';
            // Сообщаем боту об успехе
            tg.sendData('paid_success');
            tg.close();
        } else if (status === 'failed') {
            statusMessage.textContent = 'Оплата не удалась. Попробуй снова.';
        } else {
            statusMessage.textContent = 'Платеж отменен.';
        }
    });
});