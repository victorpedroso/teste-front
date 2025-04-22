import { Api } from './ClientApi';

export const useClienteApi = () => {
  const api = new Api({
    baseURL: 'https://ecjirdsy35iqhfqjtxbuf5zzda0euegm.lambda-url.us-east-1.on.aws',
    withCredentials: true,
    secure: true,
  });

  return api.api;
};
