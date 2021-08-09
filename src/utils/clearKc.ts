import { stockItem } from '../types';

export function clearKc(data: stockItem[]) {
  if (data.length) {
    return data.filter((s: stockItem) => !iskc(s.c));
  }
  return [];
}

const iskc = (code: string) => /^688\d{3}$/.test(code);
