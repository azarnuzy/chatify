import { AxiosError } from 'axios';

export type TMetaItem = {
  status: string;
  message: string;
  pagination?: TPaginationMeta;
};

export type TMetaResponse<T> = {
  data: Array<T>;
} & TMetaItem;

export type TMetaResponseSingle<T> = {
  data: T;
} & TMetaItem;

export type TMetaErrorResponse = AxiosError<TMetaItem>;
