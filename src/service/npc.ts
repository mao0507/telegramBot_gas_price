import axios from 'axios';

export const npcWeb = async () =>
  await axios.get('https://www.npcgas.com.tw/home/Oil_today');
