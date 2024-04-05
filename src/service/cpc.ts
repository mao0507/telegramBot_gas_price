import request from '../utils/request';
import { cpcModel } from '../model/cpcModel';
export const cpcApi = () =>
  request.get<cpcModel>(
    'https://www.cpc.com.tw/GetOilPriceJson.aspx?type=TodayOilPriceString'
  );
