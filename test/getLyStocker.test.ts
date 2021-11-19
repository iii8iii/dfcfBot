import { getLyStocks } from '../src/index';
describe('getLyStocks', () => {
  it('show data', async () => {
    const data = await getLyStocks();
    // console.log(data);
    expect(data).not.toBeNull();
  });
});
