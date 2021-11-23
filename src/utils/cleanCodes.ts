import { stockItem } from '../types';
import { issh, issz } from './shsz';

/**
 * 删除科创版股票代码
 * @param {stockItem[]} data 如[{c:'123456'}]
 * @return {*}
 */
export async function cleanCodes(data: stockItem[]) {
  return data.filter((s: stockItem) => {
    let newOrSt = false;
    if (s['n' as keyof object]) {
      const regExp = /st|n/i;
      newOrSt = regExp.test(s['n' as keyof object]);
    }
    return (issz(s.c) || issh(s.c)) && !newOrSt;
  });
}
