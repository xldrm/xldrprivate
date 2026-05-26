from aiogram import Bot, Dispatcher, types
import os

TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=TOKEN)
dp = Dispatcher()

# Vercel требует, чтобы это был асинхронный обработчик
async def handler(request):
    # Логика обработки входящего JSON от Telegram
    body = await request.json()
    update = types.Update.model_validate(body)
    
    # Твой код обработки
    await dp.feed_update(bot, update)
    
    return {"statusCode": 200, "body": "OK"}
