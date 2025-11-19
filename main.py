import telebot
from telebot.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton

# 1. Вставь свой Токен (обязательно в кавычках!)
BOT_TOKEN = '8550041282:AAHeyAy5zJ8z-Y4Ts8_j75cNthDw-Q_lNGM'

# 2. Вставь свой ID (цифрами, без кавычек!)
ADMIN_ID = 597572307

# 3. ИСПРАВЛЕННАЯ СТРОКА ССЫЛКИ
WEB_APP_URL = 'https://prxceo.github.io/index.html?v=new_design'

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start'])
def send_welcome(message):
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    markup.add(KeyboardButton(text="🚀 Начать PRX Legit Check", web_app=WebAppInfo(url=WEB_APP_URL)))
    
    bot.send_message(
        message.chat.id,
        "👋 **Добро пожаловать в PRX!**\n\nНажми кнопку ниже, чтобы войти в приложение.",
        reply_markup=markup,
        parse_mode="Markdown"
    )

@bot.message_handler(content_types=['web_app_data'])
def answer_web_app(message):
    # Этот блок ловит данные, если приложение что-то пришлет
    if message.web_app_data.data == 'start_upload':
        bot.send_message(
            message.chat.id,
            "📸 **Принято!**\n\nПришли фото вещи прямо в этот чат (бирка, швы, логотип).",
            parse_mode="Markdown"
        )
    elif message.web_app_data.data == 'paid_success':
         bot.send_message(message.chat.id, "✅ Оплата получена! Заявка в обработке.")

@bot.message_handler(content_types=['photo'])
def handle_photos(message):
    # Пересылаем фото тебе
    bot.forward_message(ADMIN_ID, message.chat.id, message.message_id)

print("PRX Bot запущен...")
bot.infinity_polling()