import { getZlStocks } from '../src/index';
describe('getZlStocks', () => {
  it('show data', async () => {
    const data = await getZlStocks();
    // console.log(data);
    expect(data).not.toBeNull();
  });
});
