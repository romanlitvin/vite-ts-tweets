import axios from 'axios';

export const AxiosApiService = async (
  page: number,
  abortController: AbortController
) => {
  const url = `https://643884021b9a7dd5c952ae92.mockapi.io/api/v1/tweets?page=${page}&limit=3`;

  const response = await axios.get(url, { signal: abortController.signal });

  return response.data;
};
