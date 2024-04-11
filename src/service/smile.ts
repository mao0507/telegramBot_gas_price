import axios from 'axios';

export const smileWeb = async () =>
  await axios.get('https://www.mech-smile.com.tw/');
