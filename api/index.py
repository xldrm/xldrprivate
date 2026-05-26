import json
import os
from http.server import BaseHTTPRequestHandler
from aiogram import Bot, Dispatcher, types

# Токен берем из переменных окружения Vercel
TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message()
async def handle_update(message: types.Message):
    await message.answer(f"Vercel ответил: {message.text}")

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        data = self.rfile.read(content_length)
        update = types.Update.model_validate(json.loads(data))
        
        import asyncio
        asyncio.run(dp.feed_update(bot, update))
        
        self.send_response(200)
        self.end_headers()
