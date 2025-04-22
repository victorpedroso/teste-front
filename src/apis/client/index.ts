import { Api } from './ClientApi';

export const useClienteApi = () => {
  const api = new Api({
    baseURL: 'https://localhost:44385',
    withCredentials: true,
    secure: true,
  });

  return api.api;
};
