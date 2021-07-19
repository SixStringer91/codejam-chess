const BASE_URL = '//localhost:4000/';
export const WS_URL = `ws:${BASE_URL}echo`;
export const HTTP_URL = `http:${BASE_URL}replays`;

export const isJSON = (str:string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
