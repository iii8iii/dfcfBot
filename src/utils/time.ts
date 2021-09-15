import dayjs from 'dayjs';
export const time = Date.now;

export const numDate = (num = 0) => {
  return dayjs()
    .subtract(num, 'day')
    .format('YYYYMMDD');
};
