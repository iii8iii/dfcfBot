export interface klineData {
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  cjl: number[];
  cje: number[];
  zf: number[];
  zdf: number[];
  hs: number[];
}

export interface stockItem {
  c: string;
}
export interface ztItem {
  c: string; //编号
  m: number; //属于哪个市场上海或深圳
  n: string; //名称
  p: number; //价格
  zdp: number; //涨跌幅
  amount: number; //成交额
  ltsz: number; //流通市值
  tshare: number; //总市值
  hs: number; //换手率
  lbc: number; //连板次
  fbt: number; //首次封板时间
  lbt: number; //最后封板时间
  fund: number; //封板资金
  zbc: number; //炸板次
  hybk: string; //行业
  zttj: { days: number; ct: number }; //涨停统计
}

export interface zuoZtItem {
  c: string;
  m: number;
  n: string;
  p: number;
  ztp: number; //涨停价
  zdp: number;
  amount: number;
  ltsz: number;
  tshare: number;
  hs: number;
  zf: number; //振幅
  zs: number; //涨速
  yfbt: number; //昨天封板时间
  ylbc: number; //昨天连板数
  hybk: string;
  zttj: { days: number; ct: number };
}
export interface qsItem {
  c: string;
  m: number;
  n: string;
  p: number;
  ztp: number;
  ztf: string;
  zdp: number;
  amount: number;
  ltsz: number;
  tshare: number;
  hs: number;
  nh: number; //新高
  cc: number;
  lb: number; //量比
  zs: number;
  zttj: { days: number; ct: number };
  hybk: string;
}

export interface zlItem {
  c: string;
  n: string;
  p: number;
  zdp: number;
  zlp: number;
}
export interface jeItem {
  c: string;
  n: string;
  p: number;
  zdp: number;
  je: number;
}
export type zhouqi = 'W' | 'D' | '60m' | '15m' | 'm';

export type zhouqi4money = 1 | 3 | 5 | 10;
