export interface TUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type TGetAllUserData = TMetaResponseSingle<TUser>;
