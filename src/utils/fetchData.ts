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
  msToDely: number = 1000,
  retryTimes: number = 2
): Promise<any | undefined> {
  try {
    if (retryTimes > 0) {
      const response = await got(url);
      if (
        200 === response.statusCode &&
        response.body &&
        JSON.parse(response.body).data
      ) {
        return JSON.parse(response.body).data;
      } else {
        retryTimes = retryTimes - 1;
        await delay(msToDely);
        return await fetchData(url, msToDely, retryTimes);
      }
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('ERROR OCURRED IN FETCHDATA', error);
    return undefined;
  }
}
