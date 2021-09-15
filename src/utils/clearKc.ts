import { stockItem } from '../types';

/**
 * 删除科创版股票代码
 * @param {stockItem[]} data 如[{c:'123456'}]
 * @return {*}
 */
export function clearKc(data: stockItem[]) {
  if (data.length) {
    return data.filter((s: stockItem) => !iskc(s.c));
  }
  return [];
}

/**
 * 通过正则确认传进来的股票代码是不是属于科创版
 * @param {string} code
 */
const iskc = (code: string) => /^688\d{3}$/.test(code);
