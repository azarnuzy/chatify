import { TMetaResponseSingle } from '@/types';

export interface TLogin {
  token: string;
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface TRegister {
  id: number;
  name: string;
  email: string;
}

export interface TLoginPayload {
  email: string;
  password: string;
}

export interface TRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export type TLoginData = TMetaResponseSingle<TLogin>;
export type TRegisterData = TMetaResponseSingle<TRegister>;
