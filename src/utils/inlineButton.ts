interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

interface InlineKeyboardButton {
  text: string;
  url?: string | undefined;
  callback_data?: string | undefined;
}

export const inlineButton: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: '台灣中油', callback_data: '/cpc' },
      { text: '速邁樂', callback_data: '/smile' },
      { text: '全國加油站', callback_data: '/npc' },
    ],
  ],
};
