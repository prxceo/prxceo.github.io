import telebot
from telebot import types

# Вставь сюда свой токен от BotFather
BOT_TOKEN = '8550041282:AAHeyAy5zJ8z-Y4Ts8_j75cNthDw-Q_lNGM'
bot = telebot.TeleBot(BOT_TOKEN)

# ID админа, куда будут приходить заявки (узнай свой ID через @userinfobot)
ADMIN_ID = '597572307' 

@bot.message_handler(commands=['start'])
def start(message):
    markup = types.InlineKeyboardMarkup()
    # ВАЖНО: ?v=3.0 помогает сбросить кэш телеграма
    web_app = types.WebAppInfo(url="https://prxceo.github.io/index.html?v=3.0")
    
    # Кнопка, открывающая Mini App
    markup.add(types.InlineKeyboardButton("🔥 OPEN PRX LEGIT 🔥", web_app=web_app))
    
    bot.send_message(
        message.chat.id, 
        "Привет! Нажми на кнопку ниже, чтобы запустить проверку:", 
        reply_markup=markup
    )

# Обработчик данных, пришедших из Mini App (команда sendData из JS)
@bot.message_handler(content_types=['web_app_data'])
def web_app_data(message):
    try:
        data = message.web_app_data.data
        # Отправляем подтверждение пользователю
        bot.send_message(message.chat.id, f"✅ Данные получены: {data}")
        
        # Пересылаем админу (если ID указан)
        if ADMIN_ID != 'YOUR_ADMIN_ID':
            bot.send_message(ADMIN_ID, f"📩 Новая заявка от @{message.from_user.username}:\n{data}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    bot.infinity_polling()