export interface TLoginData {
  status: string;
  message: string;
  data: TLogin;
}

export interface TLogin {
  token: string;
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface TRegisterData {
  status: string;
  message: string;
  data: TRegister | null;
}

export interface TRegister {
  id: number;
  name: string;
  email: string;
}
