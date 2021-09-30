import dayjs from 'dayjs';
export const time = Date.now;

export const numDate = (num = 0, i?: string) => {
  const format = i ? `YYYY${i}MM${i}DD` : 'YYYYMMDD';
  return dayjs()
    .subtract(num, 'day')
    .format(format);
};
