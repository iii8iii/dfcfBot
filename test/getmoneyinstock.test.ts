import { getMoneyInStocks } from '../src/index';
describe('getmoneyin', () => {
  it('today', async () => {
    const data = await getMoneyInStocks(1);
    console.log(data);
    expect(data).not.toBeNull();
  });
  it('3 days', async () => {
    const data = await getMoneyInStocks(3);
    console.log(data);
    expect(data).not.toBeNull();
  });
  it('5 days', async () => {
    const data = await getMoneyInStocks(5);
    console.log(data);
    expect(data).not.toBeNull();
  });
  it('10 days', async () => {
    const data = await getMoneyInStocks(10);
    console.log(data);
    expect(data).not.toBeNull();
  });
});
