import os
import json
from aiogram import Bot, Dispatcher, types

# Инициализация
TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message()
async def echo_handler(message: types.Message):
    await message.answer(f"Я тебя слышу! (Vercel)")

# Vercel ищет именно функцию 'handler'
async def handler(request):
    # Разбираем запрос от Telegram
    try:
        content = await request.json()
        update = types.Update.model_validate(content)
        await dp.feed_update(bot, update)
        return {"statusCode": 200, "body": "OK"}
    except Exception as e:
        print(f"Ошибка: {e}")
        return {"statusCode": 500, "body": "Internal Server Error"}
