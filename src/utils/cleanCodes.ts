import { stockItem } from '../types';
import { differenceBy } from "lodash";
import { issh, issz } from "./shsz";
import { getTpStocks } from "../index";

/**
 * 删除科创版股票代码
 * @param {stockItem[]} data 如[{c:'123456'}]
 * @return {*}
 */
export async function cleanCodes(data: stockItem[]) {
  const tp = await getTpStocks();
  if (data.length) {
    data = data.filter((s: stockItem) => issz(s.c) || issh(s.c));
    return differenceBy(data, tp, 'c');
  }
  return [];
}
