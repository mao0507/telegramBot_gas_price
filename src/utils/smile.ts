import * as cheerio from 'cheerio';
import { smileWeb } from '../service/smile';
import { Bot } from '../utils/telegramBot';
import { copyFileSync } from 'fs';

/**
 * 取得 日期時間
 * @param { cheerio.Element } htmlData
 * @returns { string }
 */
const getStartDate = (htmlData: cheerio.Element) => {
  let str: string = '';
  for (let i = 0; i < htmlData.children.length; i++) {
    const d: any = htmlData.children[i];
    if (d.type == 'text') {
      if (d.data) {
        str += `${d.data} \n`;
      }
    }
  }

  return str;
};

/**
 * 取得 單位
 * @param { cheerio.Element } htmlData
 * @returns  { string }
 */
const getUnit = (htmlData: cheerio.Element) => {
  let str: string = '';
  for (let i = 0; i < htmlData.children.length; i++) {
    const d: any = htmlData.children[i];
    if (d.type == 'text') {
      if (d.data) {
        str += `${d.data} \n`;
      }
    }
  }

  return str;
};

/**
 * 解析 浮動資料
 * @param { cheerio.Cheerio<cheerio.Element>} htmlData
 * @returns  { string }
 */
const getPriceFluctuation = (htmlData: cheerio.Cheerio<cheerio.Element>) => {
  let str = '';

  for (let i = 0; i < htmlData.length; i++) {
    if (i == 0) {
      const d: any = htmlData[i].children[0];
      const data: any = d.data;
      str += `${data} `;
    }

    if (i == 1) {
      const d: any = htmlData[i].children[0].next;
      const data: any = d.next.data;
      str += ` ${data} 元  \n`;
    }
  }

  return str;
};

const getPrice = (htmlData: cheerio.Cheerio<cheerio.Element>) => {
  let str = '';
  const priceNameList = ['98 無鉛汽油', '95+', '92', '柴油'];
  const priceList = [];
  for (let i = 0; i < htmlData.length; i++) {
    const d: any = htmlData[i];
    if (d.name == 'span') {
      const x: string = d.children[0].data
        .replace('\n', '')
        .split(' ')
        .join('');
      priceList.push(x);
    }
  }

  for (let i = 0; i < priceList.length; i++) {
    str += `${priceNameList[i]}  :   ${priceList[i]} 元 \n`;
  }

  return str;
};

/**
 * 解析網頁資料
 * @param { number }  messageId  訊息 Id
 * @param { number } chatId 聊天 Id
 */
export const getSmile = async (messageId: number, chatId: number) => {
  const web = await smileWeb();

  const $ = cheerio.load(web.data);

  let str: string = '速邁樂 資料取得成功 \n';

  const startDateHtml: any = $('.col-lg-12.text-center > .row > .col-md-7')[0];

  str += getStartDate(startDateHtml);

  const unit: any = $('.col-lg-12.text-center > .row > .col-md-5')[0];

  str += getUnit(unit);

  const priceFluctuation: any = $(
    '.ups_and_downs > .card.bg-danger.text-white > .card-body > b'
  );

  str += getPriceFluctuation(priceFluctuation);

  const price = $('.oilcost0_1 > div:nth-child(2) > span');

  str += getPrice(price);

  const option = {
    message_id: messageId,
    chat_id: chatId,
  };

  Bot.editMessageText(str, option);
};
