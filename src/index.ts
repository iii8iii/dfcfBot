import got from 'got';
import { clearKc } from './utils/clearKc';
import { marketCode } from './utils/market';
import { time, numDate } from './utils/time';
import { klineData, ztItem, zuoZtItem, qsItem, zhouqi } from './types';

export class dfcfBot {
  static async getKlineData(
    code: string,
    klineType: zhouqi = 'D'
  ): Promise<klineData | undefined> {
    try {
      const mkUrl = `http://push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ut=7eea3edcaed734bea9cbfc24409ed989&ndays=5&iscr=0&secid=${marketCode(
        code
      )}&_=${time()}`;
      const fifteenmKUrl = `http://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&ut=7eea3edcaed734bea9cbfc24409ed989&klt=15&fqt=1&secid=${marketCode(
        code
      )}&beg=0&end=20500000&_=${time()}`;
      const sixtymKUrl = `http://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&ut=7eea3edcaed734bea9cbfc24409ed989&klt=60&fqt=1&secid=${marketCode(
        code
      )}&beg=0&end=20500000&_=${time()}`;
      const dkUrl = `http://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&ut=7eea3edcaed734bea9cbfc24409ed989&klt=101&fqt=1&secid=${marketCode(
        code
      )}&beg=0&end=20500000&_=${time()}`;
      const wkUrl = `http://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&ut=7eea3edcaed734bea9cbfc24409ed989&klt=102&fqt=1&secid=${marketCode(
        code
      )}&beg=0&end=20500000&_=${time()}`;

      let url = '';
      switch (klineType) {
        case 'W':
          url = wkUrl;
          break;
        case 'D':
          url = dkUrl;
          break;
        case '60m':
          url = sixtymKUrl;
          break;
        case '15m':
          url = fifteenmKUrl;
          break;
        case 'm':
          url = mkUrl;
          break;
        default:
          url = dkUrl;
          break;
      }

      const { body } = await got(url);
      let { data } = JSON.parse(body);
      data = data || [];
      return this.klineDataJsonParser(data.klines);
    } catch (error) {
      console.log('ERROR OCCURED IN DFCF GETKLINEDATA');
      return undefined;
    }
  }

  private static klineDataJsonParser(data: string[]): klineData {
    let result: klineData = {
      open: [],
      close: [],
      high: [],
      low: [],
      cjl: [],
      cje: [],
      zf: [],
      zdf: [],
      hs: [],
    };
    data.forEach(item => {
      let content = item.split(',');
      result.open.push(Number(content[1]));
      result.close.push(Number(content[2]));
      result.high.push(Number(content[3]));
      result.low.push(Number(content[4]));
      result.cjl.push(Number(content[5]));
      result.cje.push(Number(content[6]));
      result.zf.push(Number(content[7]));
      result.zdf.push(Number(content[8]));
      result.hs.push(Number(content[10]));
    });
    return result;
  }

  static async getZtStocksInfo(fromToday = 0, amount = 100): Promise<ztItem[]> {
    try {
      let date = numDate(fromToday);
      const url = `http://push2ex.eastmoney.com/getTopicZTPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=${amount}&sort=fbt%3Aasc&date=${date}&_=${time()}`;
      const { body } = await got(url);
      let { data } = JSON.parse(body);
      data = data ? data.pool : [];
      return clearKc(data) as ztItem[];
    } catch (error) {
      console.log('ERROR OCCURED IN DFCF GETZTSTOCKSINFO');
      return [];
    }
  }

  static async getZuoZtStocksInfo(
    fromToday = 0,
    amount = 100
  ): Promise<zuoZtItem[]> {
    try {
      let date = numDate(fromToday);
      const url = `http://push2ex.eastmoney.com/getYesterdayZTPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=${amount}&sort=zs%3Adesc&date=${date}&_=${time()}`;
      const { body } = await got(url);
      let { data } = JSON.parse(body);
      data = data ? data.pool : [];
      return clearKc(data) as zuoZtItem[];
    } catch (error) {
      console.log('ERROR OCCURED IN DFCF GETZUOZTSTOCKSINFO');
      return [];
    }
  }

  static async getQsStocksInfo(amount = 100): Promise<qsItem[]> {
    try {
      let date = numDate();
      const url = `http://push2ex.eastmoney.com/getTopicQSPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=${amount}&sort=zdp%3Adesc&date=${date}&_=${time()}`;
      const { body } = await got(url);
      let { data } = JSON.parse(body);
      data = data ? data.pool : [];
      return clearKc(data) as qsItem[];
    } catch (error) {
      console.log('ERROR OCCURED IN DFCF GETQSSTOCKSINFO');
      return [];
    }
  }
}
