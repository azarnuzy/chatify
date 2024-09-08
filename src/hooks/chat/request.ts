import api from '@/configs/api';

import {
  TCreateNewChatBody,
  TCreateNewChatData,
  TCreateNewMessageBody,
  TGetChatByIdData,
  TGetChatsByUserData,
  TGetMessagesData
} from '@/types/chat';
import { TGetAllUserData } from '@/types/users';

export const getChatsByUsersRequest = async (): Promise<TGetChatsByUserData> => {
  const { data } = await api.get('/v1/chats');

  return data;
};

export const getChatsByIdRequest = async (id: string): Promise<TGetChatByIdData> => {
  const { data } = await api.get('/v1/chats/' + id);

  return data;
};

export const createNewChatRequest = async (payload: TCreateNewChatBody): Promise<TCreateNewChatData> => {
  const { data } = await api.post<TCreateNewChatData>('/v1/chats', payload);

  return data;
};

export const getMessagesRequest = async (id: string): Promise<TGetMessagesData> => {
  const { data } = await api.get('/v1/chats/' + id + '/messages');

  return data;
};

export const createNewMessageRequest = async (payload: TCreateNewMessageBody): Promise<TGetMessagesData> => {
  const { data } = await api.post('/v1/messages', payload);

  return data;
};

export const getAllUsersRequest = async (): Promise<TGetAllUserData> => {
  const { data } = await api.get('/v1/users');

  return data;
};
