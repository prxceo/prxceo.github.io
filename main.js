// --- ОБЩИЕ ЭЛЕМЕНТЫ ---
const allScreens = document.querySelectorAll('.main-screen');
const miniTimer = document.getElementById('mini-timer');
const miniTimerText = document.getElementById('mini-timer-text');
const aiIcon = document.getElementById('ai-icon');
const profileIcon = document.getElementById('profile-icon');

// --- ЭЛЕМЕНТЫ "DASHBOARD" ---
const daysLeftElement = document.getElementById('days-left-number');
const startButton = document.getElementById('start-workout-button');
const viewStatsButton = document.getElementById('view-stats-button');
const viewDietButton = document.getElementById('view-diet-button');

// --- ЭЛЕМЕНТЫ "WORKOUT" ---
const workoutScreen = document.getElementById('workout-screen');
const timerElement = document.getElementById('workout-timer');
const finishButton = document.getElementById('finish-workout-button');
const nextExerciseButton = document.getElementById('next-exercise-button');
const currentExerciseTitle = document.getElementById('current-exercise-title');
const exerciseInstructions = document.getElementById('exercise-instructions');

// --- ЭЛЕМЕНТЫ НАВИГАЦИИ (ФУТЕР) ---
const navDashboardButton = document.getElementById('nav-dashboard');
const navPlansButton = document.getElementById('nav-plans');
const navProgressButton = document.getElementById('nav-progress');
const navPremiumButton = document.getElementById('nav-premium'); // ⭐️ НОВОЕ
const allNavButtons = document.querySelectorAll('.nav-item'); // ⭐️ НОВОЕ (для подсветки)

// --- ЭЛЕМЕНТЫ: NEXA CHAT ---
const chatInput = document.getElementById('chat-input');
const chatSendButton = document.getElementById('chat-send-button');
const chatMessagesContainer = document.getElementById('chat-messages');

// --- ПЛАН ТРЕНИРОВКИ ("База данных") ---
const workoutPlan = [
    { name: "Warm-up", instruction: "5-10 minutes of light cardio (jogging, jump rope) to get your heart rate up." },
    { name: "Squats", instruction: "3 sets of 10 reps. Keep your back straight, chest up, and go down until your thighs are parallel to the floor." },
    { name: "Push-ups", instruction: "3 sets of 15 reps. Keep your body in a straight line from head to heels." },
    { name: "Lunges", instruction: "3 sets of 12 reps per leg. Step forward and lower your hips until both knees are bent at a 90-degree angle." },
    { name: "Plank", instruction: "3 sets, hold for 60 seconds. Keep your core tight and don't let your hips sag." },
    { name: "Cool-down", instruction: "5-10 minutes of light stretching. Focus on the muscles you just worked." }
];

// --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
let currentExerciseIndex = 0;
let seconds = 0;
let timerInterval = null;
let isWorkoutInProgress = false; 

// --- ФУНКЦИИ ---

// ⬇️ НОВАЯ ФУНКЦИЯ: Обновляем "активную" кнопку в футере
function updateNavActiveState(activeScreenId) {
    // 1. Убираем класс 'active' со ВСЕХ кнопок
    allNavButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 2. Добавляем 'active' только нужной кнопке
    if (activeScreenId === 'dashboard-main') {
        navDashboardButton.classList.add('active');
    } else if (activeScreenId === 'plans-screen') {
        navPlansButton.classList.add('active');
    } else if (activeScreenId === 'progress-screen') {
        navProgressButton.classList.add('active');
    } else if (activeScreenId === 'premium-screen') {
        navPremiumButton.classList.add('active');
    }
    // (Profile и Workout не имеют кнопок в футере, поэтому их не подсвечиваем)
}

// ⬇️ ОБНОВЛЕННАЯ ГЛАВНАЯ ФУНКЦИЯ: НАВИГАЦИЯ ⬇️
function navigateTo(screenId) {
    // 1. Переключаем экран
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
    
    // 2. Обновляем подсветку футера
    updateNavActiveState(screenId);
    
    // 3. Показываем/прячем мини-таймер
    if (isWorkoutInProgress && screenId !== 'workout-screen') {
        miniTimer.style.display = 'flex';
    } else {
        miniTimer.style.display = 'none';
    }
}

// --- Функции Таймера ---
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function updateTimer() {
    seconds++;
    const formattedTime = formatTime(seconds);
    timerElement.textContent = formattedTime;
    miniTimerText.textContent = formattedTime;
}

// --- Функции Тренировки ---
function showExercise(index) {
    currentExerciseTitle.textContent = workoutPlan[index].name;
    exerciseInstructions.textContent = workoutPlan[index].instruction;
}

function startWorkout() {
    isWorkoutInProgress = true;
    seconds = 0;
    timerElement.textContent = '00:00';
    miniTimerText.textContent = '00:00';
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    currentExerciseIndex = 0;
    showExercise(currentExerciseIndex);
    nextExerciseButton.style.display = 'block';
    navigateTo('workout-screen');
}

function finishWorkout() {
    isWorkoutInProgress = false;
    clearInterval(timerInterval);
    timerInterval = null;
    navigateTo('dashboard-main'); // ⭐️ Возвращаемся на дашборд
}

function nextExercise() {
    currentExerciseIndex++;
    if (currentExerciseIndex < workoutPlan.length) {
        showExercise(currentExerciseIndex);
    } else {
        currentExerciseTitle.textContent = "Workout Complete!";
        exerciseInstructions.textContent = "Great job! You finished the AI-Plan. Don't forget to cool-down and log your progress.";
        nextExerciseButton.style.display = 'none';
    }
}

// --- Функция: Nexa Chat ---
function sendChatMessage() {
    const messageText = chatInput.value;
    if (messageText.trim() === "") { return; }
    
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user');
    userMessageElement.textContent = messageText;
    chatMessagesContainer.appendChild(userMessageElement);
    chatInput.value = "";
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    
    // TODO: Здесь будет логика "ответа" от AI
}

// --- Функция Графика ---
function initWeightChart() {
    const ctx = document.getElementById('weight-chart').getContext('2d');
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Weight (kg)',
            data: [85, 84.5, 84, 83, 83.5],
            fill: false,
            borderColor: '#00bfff',
            tension: 0.1
        }]
    };
    new Chart(ctx, {
        type: 'line', data: data,
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#f0f0f0' } } },
            scales: {
                y: { ticks: { color: '#aaa' }, grid: { color: '#444' } },
                x: { ticks: { color: '#aaa' }, grid: { color: '#444' } }
            }
        }
    });
}

// --- ЗАПУСК ПРИЛОЖЕНИЯ (Инициализация) ---
window.addEventListener('load', function() {
    navigateTo('dashboard-main'); // ⭐️ Начинаем с 'dashboard-main'

    // Считаем дни
    const goalDate = new Date('2025-12-01');
    const today = new Date();
    const timeDifference = goalDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if (daysLeft > 0) {
        daysLeftElement.textContent = daysLeft.toString();
    } else {
        daysLeftElement.textContent = '0';
    }
    
    // Рисуем график
    initWeightChart();
});

// "Слушатели" Навигации
navDashboardButton.addEventListener('click', () => navigateTo('dashboard-main'));
navPlansButton.addEventListener('click', () => navigateTo('plans-screen'));
navProgressButton.addEventListener('click', () => navigateTo('progress-screen'));
navPremiumButton.addEventListener('click', () => navigateTo('premium-screen')); // ⭐️ НОВОЕ
miniTimer.addEventListener('click', () => navigateTo('workout-screen'));

// "Слушатели" Тренировки
startButton.addEventListener('click', startWorkout);
finishButton.addEventListener('click', finishWorkout);
nextExerciseButton.addEventListener('click', nextExercise);

// "Слушатели" ЧАТА
aiIcon.addEventListener('click', () => navigateTo('nexa-chat-screen')); 
chatSendButton.addEventListener('click', sendChatMessage);

// "Слушатели" Ссылок и Профиля
profileIcon.addEventListener('click', () => navigateTo('profile-screen'));
viewStatsButton.addEventListener('click', () => navigateTo('progress-screen'));
viewDietButton.addEventListener('click', () => navigateTo('plans-screen'));