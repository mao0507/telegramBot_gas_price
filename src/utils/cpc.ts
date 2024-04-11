import { Bot } from '../utils/telegramBot';
import { cpcApi } from '../service/cpc';

export const getCpc = async (messageId: number, chatId: number) => {
  const d = await cpcApi();

  const option = {
    message_id: messageId,
    chat_id: chatId,
  };

  const isDowngrade = d.UpOrDown_Html.includes('調降');
  const price = d.UpOrDown_Html.replace(/[^0-9.]/g, '');

  let str: string = '台灣中油 資料取得成功 \n\n';
  str += `單位：元/公升 \n`;
  str += `本週汽油價格 ${isDowngrade ? '調降' : '調漲'} ${price} \n`;
  str += `從 ${d.PriceUpdate} 零時起實施 \n`;
  str += `92 無鉛汽油 : ${d.sPrice1} 元 \n`;
  str += `95 無鉛汽油 : ${d.sPrice2} 元 \n`;
  str += `98 無鉛汽油 : ${d.sPrice3} 元 \n`;
  str += `超級柴油 : ${d.sPrice5} 元 \n`;
  str += `價格如有變動，請依現場實際牌價為主 `;
  // str += `酒精汽油 : ${d.sPrice4} 元 \n`;
  // str += `液化石油氣 : ${d.sPrice6} 元 \n`;

  Bot.editMessageText(str, option);
};
