from aiogram import Bot, Dispatcher, types
import os

TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=TOKEN)
dp = Dispatcher()

async def handler(request):
    try:
        # Получаем данные из запроса
        data = await request.json()
        update = types.Update.model_validate(data)
        await dp.feed_update(bot, update)
        return {"statusCode": 200, "body": "OK"}
    except Exception:
        return {"statusCode": 200, "body": "OK"} # Возвращаем 200, чтобы Telegram не спамил ошибками
