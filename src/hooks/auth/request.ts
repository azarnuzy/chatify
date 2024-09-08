import api from '@/configs/api';

import { TLoginData, TLoginPayload, TRegisterData, TRegisterPayload } from '@/types/auth';

export const loginRequest = async (payload: TLoginPayload): Promise<TLoginData> => {
  const { data } = await api.post<TLoginData>('/v1/auth/login', payload);

  return data;
};

export const registerRequest = async (payload: TRegisterPayload): Promise<TRegisterData> => {
  const { data } = await api.post<TRegisterData>('/v1/auth/register', payload);

  return data;
};
