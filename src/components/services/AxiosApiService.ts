import axios from 'axios';
import type { ITweet } from '../../types/types';

export const AxiosApiServiceGet = async (
  page: number,
  abortController: AbortController
) => {
  const url = `https://643884021b9a7dd5c952ae92.mockapi.io/api/v1/tweets?page=${page}&limit=3`;
  const response = await axios.get(url, { signal: abortController.signal });
  return response.data;
};

export const AxiosApiServicePut = async ({
  user,
  tweets,
  followers,
  avatar,
  id,
}: ITweet) => {
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
