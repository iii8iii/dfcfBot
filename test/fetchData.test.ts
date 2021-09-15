import { fetchData } from '../src/utils/fetchData';
import { time, numDate } from '../src/utils/time';

describe('fetchData', () => {
  it('fetch a available url', async () => {
    const date = numDate(0);
    const url = `http://push2ex.eastmoney.com/getTopicZTPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=100&sort=fbt%3Aasc&date=${date}&_=${time()}`;
    expect(await fetchData(url, 1000, 3)).not.toBeNull();
  });
});
