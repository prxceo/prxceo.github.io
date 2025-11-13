// 1. Инициализируем "мост" с Telegram
const tg = window.Telegram.WebApp;

// 2. Находим наши кнопки и элементы
const uploadButton = document.getElementById('upload-button');
const payButton = document.getElementById('pay-button');
const statusMessage = document.getElementById('status-message');

// 3. Говорим Telegram, что Mini App готов
tg.ready();

// 4. Вешаем "слушателя" на кнопку Загрузки
uploadButton.addEventListener('click', () => {
    statusMessage.textContent = 'Функция загрузки фото в разработке...';
});

// 5. ⬇️ ИЗМЕНЕНИЕ ЗДЕСЬ: "Слушатель" на кнопку Оплаты (НАСТОЯЩИЕ STARS) ⬇️
payButton.addEventListener('click', () => {
    
    // Это НАСТОЯЩИЙ платеж в Telegram Stars
    tg.showInvoice({
        title: 'PRX Legit Check',
        description: 'Полная проверка подлинности (1 шт)',
        payload: 'prx-legit-check-v1', // Уникальный ID платежа
        currency: 'XTR', // ⬅️ Вот магия. 'XTR' - это Telegram Stars
        prices: [{ label: 'Проверка AI + Эксперт', amount: 200 }] // ⬅️ 200 Звезд
        
        // provider_token нам не нужен для Stars
        
    }, (status) => {
        // Эта функция (callback) сработает ПОСЛЕ того, как пользователь
        // попытается оплатить и закроет окно платежа.
        
        if (status === 'paid') {
            // Оплата прошла УСПЕШНО
            statusMessage.textContent = 'Оплата прошла! Начинаем проверку...';
            // Отправляем данные нашему боту
            tg.sendData(JSON.stringify({ status: 'paid', item: 'legit_check_200_stars' }));
            // И закрываем приложение
            tg.close();
        } else if (status === 'failed') {
            // Оплата не удалась
            statusMessage.textContent = 'Оплата не удалась. Попробуйте снова.';
        } else {
            // 'pending' или 'cancelled'
            statusMessage.textContent = 'Платеж отменен.';
        }
    });
});