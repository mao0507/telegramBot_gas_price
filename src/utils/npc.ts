import * as cheerio from 'cheerio';
import { npcWeb } from '../service/npc';
import { Bot } from '../utils/telegramBot';
/**
 * 取得 日期相關資訊
 * @param { cheerio.Element } htmlData
 * @returns { string }
 */
const getStartDateTime = (htmlData: cheerio.Element) => {
  let str: string = '';

  for (let i = 0; i < htmlData.children.length; i++) {
    const d: any = htmlData.children[i];
    if (d.type == 'text') {
      if (d.data) {
        const text = d.data.split(' ').join('');
        str += `${text} \n`;
      }
    }
  }

  return str;
};

/**
 * 取得油價相關
 * @param {cheerio.Cheerio<cheerio.Element>} htmlData
 * @returns { string }
 */
const getPrice = (product: string, htmlData: cheerio.Element) => {
  let str: string = '';

  let price = '';

  for (let i = 0; i < htmlData.children.length; i++) {
    const p: any = htmlData.children[i];
    if (p.name == 'span') {
      if (p.children.length > 0) {
        const text = p.children[0];
        // console.log(text.data);
        price = text.data;
      }
    }
  }

  if (product == '92') {
    str += `92 無鉛汽油 ${price} 元 \n`;
  }
  if (product == '95+') {
    str += `95 無鉛汽油 ${price} 元 \n`;
  }
  if (product == '98') {
    str += `98 無鉛汽油 ${price} 元 \n`;
  }
  if (product == 'super') {
    str += `超級柴油 ${price} 元 \n`;
  }

  return str;
};

/**
 * 取得 網頁資料，解析需要的出來
 * @param { number } messageId  訊息 Id
 * @param { number } chatId  聊天 Id
 */
export const getNpc = async (messageId: number, chatId: number) => {
  const web = await npcWeb();

  // 載入要抓取頁面
  const $ = cheerio.load(web.data);

  let str: string = '全國加油站 資料取得成功 \n';

  const startDateHtml: cheerio.Element = $('.no_top > h4')[1];

  str += getStartDateTime(startDateHtml);

  const product: Array<string> = ['92', '95', '98', 'super'];

  product.forEach((x) => {
    const priceHtml: cheerio.Element = $(`.oil-box[oil-num='${x}'] > p`)[1];
    str += getPrice('92', priceHtml);
  });

  const option = {
    message_id: messageId,
    chat_id: chatId,
  };

  Bot.editMessageText(str, option);
};
