// 1. Инициализируем "мост" с Telegram
const tg = window.Telegram.WebApp;

// 2. Находим наши кнопки и элементы
const uploadButton = document.getElementById('upload-button');
const payButton = document.getElementById('pay-button');
const statusMessage = document.getElementById('status-message');

// 3. Говорим Telegram, что Mini App готов
tg.ready();

// 4. Вешаем "слушателя" на кнопку Загрузки
// (Пока она ничего не делает, просто пишет)
uploadButton.addEventListener('click', () => {
    statusMessage.textContent = 'Функция загрузки фото в разработке...';
    
    // (В будущем здесь будет код, открывающий камеру)
    // tg.showScanQrPopup(...); 
});

// 5. Вешаем "слушателя" на кнопку Оплаты
payButton.addEventListener('click', () => {
    
    // Это тестовый платеж. Он не снимет реальные деньги
    tg.showInvoice({
        title: 'PRX Legit Check',
        description: 'Полная проверка подлинности (1 шт)',
        payload: 'test-invoice-payload-123',
        provider_token: '', // Оставим пустым для теста
        currency: 'USD',
        prices: [{ label: 'Проверка AI + Эксперт', amount: 399 }] // $3.99
    }, (status) => {
        if (status === 'paid') {
            statusMessage.textContent = 'Оплата прошла! Начинаем проверку...';
            // Здесь мы отправим данные нашему боту
            tg.sendData(JSON.stringify({ status: 'paid', item: 'legit_check' }));
            // И закроем приложение
            tg.close();
        } else if (status === 'failed') {
            statusMessage.textContent = 'Оплата не удалась. Попробуйте снова.';
        } else {
            statusMessage.textContent = 'Платеж отменен.';
        }
    });
});