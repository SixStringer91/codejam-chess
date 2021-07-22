import { FigureColor } from '../enums/enums';

const { BLACK, WHITE } = FigureColor;

const BASE_URL = '//immense-crag-63696.herokuapp.com/';
export const WS_URL = `wss:${BASE_URL}echo`;
export const HTTP_URL = `https:${BASE_URL}replays`;

export const isJSON = (str:string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const whatColor = (color: FigureColor) => {
  if (color === BLACK) {
    return WHITE;
  }
  return BLACK;
};

export const intervals = [2000, 3000, 4000, 5000];
