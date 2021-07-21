import axios from 'axios';
import { IReplay } from '../../interfaces/interfaces';
import { HTTP_URL } from '../../utils/usefull_utils';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export const getReplaysThunk = async (): Promise<any> => {
  try {
    const response = await axios.get(HTTP_URL);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const saveReplayThunk = async (replay: IReplay): Promise<any> => {
  try {
    const response = await axios.post(HTTP_URL, JSON.stringify(replay), {
      headers
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
