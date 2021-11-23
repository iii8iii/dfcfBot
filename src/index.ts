import {
  klineData,
  ztItem,
  zuoZtItem,
  qsItem,
  zhouqi,
  zhouqi4money,
  stockItem,
  zlItem,
  jeItem,
  lyItem,
} from './types';
import { time, numDate } from './utils/time';
import { marketCode } from './utils/market';
import { cleanCodes } from './utils/cleanCodes';
import { fetchData } from './utils/fetchData';

/**
 * get kline data for diffent time
 * @param {string} code 股票代码
 * @param {zhouqi} [klineType='D'] K线类型：W（周线），D（日线，默认），60m、15m、m（分别为60，15，1分钟线）
 * @return {*}  {(Promise<klineData | undefined>)} 返回的数据类型为Object,{open: [开], close: [收],high: [高],low: [低],cjl: [成交量],cje: [成交额],zf: [振幅],zdf: [涨跌幅],hs: [换手率],}
 */
export async function getKlineData(
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

    const { data } = await fetchData(url, 1000, 3);
    const klines: string[] = data ? data.klines : [];
    if (klines.length) {
      return klineDataJsonParser(klines);
    } else {
      return undefined;
    }
  } catch (error) {
    console.log('ERROR OCCURED IN DFCF GETKLINEDATA', error);
    return undefined;
  }
}

function klineDataJsonParser(data: string[]): klineData {
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
  for (const item of data) {
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
  }
  return result;
}

/**
 * 这个搜索的是实时涨停的股票，用来做清理，因为涨停了就不能再买了，分析也没用
 * @param {number} [fromToday=0]
 * @param {number} [amount=100]
 * @return {*}  {Promise<ztItem[]>}
 */
export async function getZtStocksInfo(
  fromToday = 0,
  amount = 100
): Promise<ztItem[]> {
  try {
    let date = numDate(fromToday);
    const url = `http://push2ex.eastmoney.com/getTopicZTPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=${amount}&sort=fbt%3Aasc&date=${date}&_=${time()}`;
    let { data } = await fetchData(url, 1000, 3);
    data = data ? data.pool : [];
    return (await cleanCodes(data)) as ztItem[];
  } catch (error) {
    console.log('ERROR OCCURED IN DFCF GETZTSTOCKSINFO', error);
    return [];
  }
}

/**
 *这个搜索的是前一天涨停的股票今天的情况
 *
 * @param {number} [fromToday=0]
 * @param {number} [amount=100]
 * @return {*}  {Promise<zuoZtItem[]>}
 */
export async function getZuoZtStocksInfo(
  fromToday = 0,
  amount = 100
): Promise<zuoZtItem[]> {
  try {
    let date = numDate(fromToday);
    const url = `http://push2ex.eastmoney.com/getYesterdayZTPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=${amount}&sort=zs%3Adesc&date=${date}&_=${time()}`;
    let { data } = await fetchData(url, 1000, 3);
    data = data ? data.pool : [];
    return (await cleanCodes(data)) as zuoZtItem[];
  } catch (error) {
    console.log('ERROR OCCURED IN DFCF GETZUOZTSTOCKSINFO', error);
    return [];
  }
}

/**
 *搜索强势股票的实时信息，是按涨幅排序的
 *
 * @param {number} [amount=100]
 * @return {*}  {Promise<qsItem[]>}
 */
export async function getQsStocksInfo(amount = 100): Promise<qsItem[]> {
  try {
    let date = numDate();
    const url = `http://push2ex.eastmoney.com/getTopicQSPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=${amount}&sort=zdp%3Adesc&date=${date}&_=${time()}`;
    let { data } = await fetchData(url, 1000, 3);
    data = data ? data.pool : [];
    return (await cleanCodes(data)) as qsItem[];
  } catch (error) {
    console.log('ERROR OCCURED IN DFCF GETQSSTOCKSINFO', error);
    return [];
  }
}

/**
 * 抓取资金净流入前50的股票，只返回股票代码数组，周期分别当天，三天，五天，十天
 * @param {zhouqi4money} zhouqi
 * @return {*}  {Promise<stockItem[]>}
 */
export async function getMoneyInStocks(
  zhouqi?: zhouqi4money
): Promise<jeItem[]> {
  try {
    let url: string = '';
    const oneDayUrl =
      'http://push2.eastmoney.com/api/qt/clist/get?fid=f62&po=1&pz=50&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=m:0+t:6+f:!2,m:0+t:13+f:!2,m:0+t:80+f:!2,m:1+t:2+f:!2,m:1+t:23+f:!2,m:0+t:7+f:!2,m:1+t:3+f:!2&fields=f2,f3,f12,f62,f14';
    const threeDaysUrl =
      'http://push2.eastmoney.com/api/qt/clist/get?fid=f267&po=1&pz=50&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=m:0+t:6+f:!2,m:0+t:13+f:!2,m:0+t:80+f:!2,m:1+t:2+f:!2,m:1+t:23+f:!2,m:0+t:7+f:!2,m:1+t:3+f:!2&fields=f2,f127,f12,f267,f14';
    const fiveDaysUrl =
      'http://push2.eastmoney.com/api/qt/clist/get?fid=f164&po=1&pz=50&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=m:0+t:6+f:!2,m:0+t:13+f:!2,m:0+t:80+f:!2,m:1+t:2+f:!2,m:1+t:23+f:!2,m:0+t:7+f:!2,m:1+t:3+f:!2&fields=f2,f109,f12,f164,f14';
    const tenDaysUrl =
      'http://push2.eastmoney.com/api/qt/clist/get?fid=f174&po=1&pz=50&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=m:0+t:6+f:!2,m:0+t:13+f:!2,m:0+t:80+f:!2,m:1+t:2+f:!2,m:1+t:23+f:!2,m:0+t:7+f:!2,m:1+t:3+f:!2&fields=f2,f160,f12,f174,f14';
    switch (zhouqi) {
      case 1:
        url = oneDayUrl;
        break;
      case 3:
        url = threeDaysUrl;
        break;
      case 5:
        url = fiveDaysUrl;
        break;
      case 10:
        url = tenDaysUrl;
        break;
      default:
        url = oneDayUrl;
        break;
    }
    const { data } = await fetchData(url, 1000, 3);
    if (data && data.diff) {
      let result: jeItem[] = [];
      for (const obj of data.diff) {
        const {
          f2,
          f12,
          f62,
          f267,
          f164,
          f174,
          f3,
          f127,
          f109,
          f160,
          f14,
        } = obj;
        const c = f12;
        const n = f14;
        const p = f2;
        const zdp = f3 ? f3 : f127 ? f127 : f109 ? f109 : f160 ? f160 : 0;
        const je = f62 ? f62 : f267 ? f267 : f164 ? f164 : f174 ? f174 : 0;
        result.push({ c, n, p, zdp, je });
      }
      result = (await cleanCodes(result)) as jeItem[];
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log('EORRO OCURRED IN getMoneyInStocks', error);
    return [];
  }
}

/**
 * 获取五分钟涨幅前50支股票，只会返回股票编码
 * @return {*}
 */
export async function get5minZfStocks() {
  try {
    const url =
      'https://54.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=50&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f11&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23&fields=f12';
    const { data } = await fetchData(url, 1000, 3);
    if (data && data.diff) {
      let result: stockItem[] = [];
      for (const obj of data.diff) {
        result.push({ c: obj['f12'] });
      }
      result = await cleanCodes(result);
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log('EORRO OCURRED IN get5minZfStocks', error);
    return [];
  }
}

/**
 * 抓取当天停牌的股票，主要用来将他们排除
 * @return {*}
 */
export async function getTpStocks() {
  try {
    const url = `https://datainterface.eastmoney.com/EM_DataCenter/JS.aspx?sr=-1&ps=500&p=1&type=FD&sty=SRB&js=[(x)]&fd=${numDate(
      0,
      '-'
    )}`;
    const data = await fetchData(url, 1000, 3);
    let result: stockItem[] = [];
    if (data && data.length) {
      for (const item of data) {
        //"002668,ST奥马,2021-09-27 09:30,2021-09-29 15:00,连续停牌,刊登重要公告,,2021-09-27,2021-09-30"
        const code: string = item.split(',')[0];
        result.push({ c: code });
      }
    }
    return result;
  } catch (error) {
    console.log('EORRO OCURRED IN getTpStocks', error);
    return [];
  }
}

/**
 * 主力占比前50
 * @param {number} [pz=50]
 * @return {*}
 */
export async function getZlStocks(pz: number = 50): Promise<zlItem[]> {
  try {
    const url = `http://push2.eastmoney.com/api/qt/clist/get?fid=f184&po=1&pz=${pz}&pn=1&np=1&fltt=2&invt=2&fields=f2,f12,f184,f160,f14&ut=b2884a393a59ad64002292a3e90d46a5&fs=m:0+t:6+f:!2,m:0+t:13+f:!2,m:0+t:80+f:!2,m:1+t:2+f:!2,m:1+t:23+f:!2`;
    let result: zlItem[] = [];
    const { data } = await fetchData(url, 1000, 3);
    if (data && data.diff) {
      for (const item of data.diff) {
        let zl: zlItem = {
          c: item['f12'],
          n: item['f14'],
          p: item['f2'],
          zdp: item['f160'],
          zlp: item['f184'],
        };
        result.push(zl);
      }
      result = (await cleanCodes(result)) as zlItem[];
    }
    return result;
  } catch (error) {
    console.log('EORRO OCURRED IN getZlStocks', error);
    return [];
  }
}

/**
 * 行业领涨股，龙一
 * @return {*}  {Promise<stockItem[]>}
 */
export async function getLyStocks(): Promise<lyItem[]> {
  try {
    const url = `https://100.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=70&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f104&fs=m:90+t:2+f:!50&fields=f128,f140`;
    let result: lyItem[] = [];
    const { data } = await fetchData(url, 1000, 3);
    if (data && data.diff) {
      for (const item of data.diff) {
        result.push({ c: item['f140'], n: item['f128'] });
      }
    }
    result = await cleanCodes(result) as lyItem[];
    return result;
  } catch (error) {
    console.error('DFCFBOT->getLyStocks:', error);
    return [];
  }
}
