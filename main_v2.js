const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Функция для перехода между экранами
function goToScreen(screenId) {
    // 1. Скрываем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // 2. Показываем нужный
    document.getElementById(screenId).classList.add('active');
}

// Логика выбора категории
let selectedCategory = null;
const nextBtn = document.getElementById('next-btn-cat');

function selectCategory(category) {
    // Убираем выделение со всех
    document.querySelectorAll('.grid-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Находим элемент, по которому кликнули, и выделяем его
    // (В реальном коде можно сделать изящнее, но пока так)
    event.currentTarget.classList.add('selected');
    
    selectedCategory = category;
    
    // Активируем кнопку "Далее"
    nextBtn.style.opacity = "1";
    nextBtn.onclick = function() {
        // Временная заглушка
        alert("Выбрано: " + selectedCategory + ". Здесь откроется загрузка фото.");
    };
}