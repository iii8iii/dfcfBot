import delay from 'delay';
import got from 'got';

/**
 * if retryTimes is big than 0, make a request, if the response statusCode is not 200, meaning requset failed,delay and retry
 * @param {string} url
 * @param {number} msToDely
 * @param {number} [retryTimes=2]
 */
export async function fetchData(
  url: string,
  msToDely: number,
  retryTimes: number = 2
): Promise<object | undefined> {
  try {
    if (retryTimes > 0) {
      const response = await got(url);
      if (response.statusCode !== 200) {
        retryTimes = retryTimes - 1;
        await delay(msToDely);
        return await fetchData(url, msToDely, retryTimes);
      } else {
        return JSON.parse(response.body);
      }
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('ERROR OCURRED IN FETCHDATA');
    return undefined;
  }
};
