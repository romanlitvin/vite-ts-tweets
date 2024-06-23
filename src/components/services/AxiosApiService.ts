import axios from 'axios';
import type { ITweet } from '../../types/types';

// Bad naming. Functions usually are camelCase.
export const AxiosApiServiceGet = async (
  page: number,
  abortController: AbortController
) => {
  // Base url can be extracted to a constant. + can be made with creating axios instance with base url.
  const url = `https://643884021b9a7dd5c952ae92.mockapi.io/api/v1/tweets?page=${page}&limit=3`;
  const response = await axios.get(url, { signal: abortController.signal });
  return response.data;
};

// Same here. Should be camelCase.
export const AxiosApiServicePut = async ({
  user,
  tweets,
  followers,
  avatar,
  id,
}: ITweet) => {
  // Same here. Base url can be extracted to a constant.
  const url = `https://643884021b9a7dd5c952ae92.mockapi.io/api/v1/tweets/${id}`;
  const response = await axios.put(url, {
    user,
    tweets,
    followers,
    avatar,
    id,
  });
  return response.data;
};
