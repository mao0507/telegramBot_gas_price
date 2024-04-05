import { token } from './envData';

// 引用 TelegramBot

import TelegramBot from 'node-telegram-bot-api';

// 建立 Bot 物件
export const Bot = new TelegramBot(token, { polling: true });
