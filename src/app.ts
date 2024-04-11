import { Bot } from './utils/telegramBot';
import { inlineButton } from './utils/inlineButton';
import { getCpc } from './utils/cpc';
import { getNpc } from './utils/npc';
import { getSmile } from './utils/smile';

//提示訊息，方便終端機檢閱是否執行
console.log('telegramBot is working Now');

// 中油
Bot.onText(/\/cpc/, async (msg) => {
  const userId = msg.chat.id;

  const { message_id, chat } = await Bot.sendMessage(userId, '資料取得中...');

  await getCpc(message_id, chat.id);
});

// 全國加油站
Bot.onText(/\/npc/, async (msg) => {
  const userId = msg.chat.id;

  const { message_id, chat } = await Bot.sendMessage(userId, '資料取得中...');

  await getNpc(message_id, chat.id);
});

// 速邁樂
Bot.onText(/\/smile/, async (msg) => {
  const userId = msg.chat.id;

  const { message_id, chat } = await Bot.sendMessage(userId, '資料取得中...');

  await getSmile(message_id, chat.id);
});

// 選單按鈕
Bot.onText(/\/start/, (msg) => {
  const userId = msg.chat.id;
  Bot.sendMessage(userId, '請選擇要查看的油價資訊 ⛽', {
    reply_markup: inlineButton,
  });
});

// 按鈕觸發後，接收回傳資訊
Bot.on('callback_query', async (d) => {
  const { message_id, chat } = await Bot.sendMessage(
    d.from.id,
    '資料取得中...'
  );

  if (d.data == '/cpc') {
    await getCpc(message_id, chat.id);
  }

  if (d.data == '/npc') {
    await getNpc(message_id, chat.id);
  }

  if (d.data == '/smile') {
    await getSmile(message_id, chat.id);
  }
});
