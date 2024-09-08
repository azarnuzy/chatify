import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { loginRequest, registerRequest } from '@/hooks/auth/request';

import { TMetaErrorResponse } from '@/types';
import { TLoginData, TLoginPayload, TRegisterData, TRegisterPayload } from '@/types/auth';

export const useLogin = (): UseMutationResult<TLoginData, TMetaErrorResponse, TLoginPayload> => {
  return useMutation<TLoginData, TMetaErrorResponse, TLoginPayload>({
    mutationKey: ['login'],
    mutationFn: async (payload: TLoginPayload) => {
      const response = await loginRequest(payload);

      if (!response) {
        throw new Error('Login failed');
      }

      return response;
    }
  });
};

export const useRegister = (): UseMutationResult<TRegisterData, TMetaErrorResponse, TRegisterPayload> => {
  return useMutation<TRegisterData, TMetaErrorResponse, TRegisterPayload>({
    mutationKey: ['register'],
    mutationFn: async (payload: TRegisterPayload) => {
      const response = await registerRequest(payload);

      if (!response) {
        throw new Error('Login failed');
      }

      return response;
    }
  });
};
