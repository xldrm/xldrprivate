import os
import json
from aiogram import Bot, Dispatcher, types

TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message()
async def echo_handler(message: types.Message):
    await message.answer(f"Я тебя слышу! (Vercel)")

async def handler(request):
    # Этот принт ОБЯЗАН появиться в логах, если запрос пришел
    print("Получен запрос от Telegram!") 
    
    body = await request.json()
    update = types.Update.model_validate(body)
    await dp.feed_update(bot, update)
    return {"statusCode": 200, "body": "OK"}
