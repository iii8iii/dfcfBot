import { issh, issz } from './shsz';
export const marketCode = (code: string) => {
  const zero = issz(code) ? '0' : issh(code) ? '1' : undefined;
  if (zero) {
    return `${zero}.${code}`;
  } else {
    console.log('代码不匹配,现在的股票代码是：', code);
    return '';
  }
};
