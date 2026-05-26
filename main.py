import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart

# Вставь сюда свой токен, который дал BotFather
TOKEN = "8996683758:AAFuH4sCLISk6lqEBDjN72b6tIOW0mcZeaE"

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    await message.answer("Привет! Я твой личный бот-помощник. Я готов к работе.")

@dp.message()
async def process_message(message: types.Message):
    text = message.text
    
    # Простая логика: если в сообщении есть цифры — это расход
    if any(char.isdigit() for char in text):
        await message.answer(f"Принято! Сумма {text}. Какая это категория? (еда, транспорт, развлечения)")
    else:
        await message.answer("Я тебя услышал. Пока не знаю, что с этим делать, но я запомню!")

async def main():
    print("Бот запущен!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
