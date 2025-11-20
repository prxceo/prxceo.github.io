import telebot
from telebot.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton

# 1. ВСТАВЬ СЮДА СВОЙ ТОКЕН (В КАВЫЧКАХ)
BOT_TOKEN = '8550041282:AAHeyAy5zJ8z-Y4Ts8_j75cNthDw-Q_lNGM'

# 2. ВСТАВЬ СЮДА СВОЙ ID (ЦИФРАМИ, БЕЗ КАВЫЧЕК)
ADMIN_ID = 597572307

# 3. ССЫЛКА НА НОВЫЙ ФАЙЛ (prx.html)
WEB_APP_URL = 'https://prxceo.github.io/index.html?v=clean_design'

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start'])
def send_welcome(message):
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    
    # ⬇️ КНОПКА С НОВЫМ ТЕКСТОМ (ЧТОБЫ ТЫ ВИДЕЛ ИЗМЕНЕНИЯ) ⬇️
    web_app_button = KeyboardButton(
        text="Open App", 
        web_app=WebAppInfo(url=WEB_APP_URL)
    )
    
    markup.add(web_app_button)
    
    bot.send_message(
        message.chat.id,
        "👋 **Добро пожаловать в PRX Legit Check!**\n\n"
        "Нажми красную кнопку ниже, чтобы открыть новую версию.",
        reply_markup=markup,
        parse_mode="Markdown"
    )

# Обработка данных от приложения
@bot.message_handler(content_types=['web_app_data'])
def answer_web_app(message):
    if message.web_app_data.data == 'start_upload':
        bot.send_message(
            message.chat.id,
            "📸 **Принято!**\n\nПришли фото вещи прямо в этот чат (бирка, швы, логотип). Я перешлю их эксперту.",
            parse_mode="Markdown"
        )
    elif message.web_app_data.data == 'paid_success':
         bot.send_message(message.chat.id, "✅ Оплата получена! Статус: PREMIUM.")

# Пересылка фото тебе
@bot.message_handler(content_types=['photo'])
def handle_photos(message):
    bot.forward_message(ADMIN_ID, message.chat.id, message.message_id)

print("PRX Bot перезапущен...")
bot.infinity_polling()