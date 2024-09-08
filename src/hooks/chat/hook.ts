/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  createNewChatRequest,
  createNewMessageRequest,
  getAllUsersRequest,
  getChatsByIdRequest,
  getChatsByUsersRequest,
  getMessagesRequest
} from '@/hooks/chat/request';

import { TMetaErrorResponse } from '@/types';
import {
  TCreateNewChatBody,
  TCreateNewChatData,
  TCreateNewMessageBody,
  TGetChatByIdData,
  TGetChatsByUserData,
  TGetMessagesData
} from '@/types/chat';
import { TGetAllUserData } from '@/types/users';

export const useGetChatsByUser = (): UseQueryResult<TGetChatsByUserData, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-chats-by-user'],
    queryFn: async () => {
      try {
        return await getChatsByUsersRequest();
      } catch (error: any) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error as any);
        }
      }
    }
  });

export const useGetChatsById = (id: string): UseQueryResult<TGetChatByIdData, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-chats-by-id', id],
    queryFn: async () => {
      try {
        return await getChatsByIdRequest(id);
      } catch (error: any) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error as any);
        }
      }
    }
  });

export const useCreateNewChat = (): UseMutationResult<TCreateNewChatData, TMetaErrorResponse, TCreateNewChatBody> => {
  return useMutation<TCreateNewChatData, TMetaErrorResponse, TCreateNewChatBody>({
    mutationKey: ['create-new-post'],
    mutationFn: async (payload: TCreateNewChatBody) => {
      try {
        const response = await createNewChatRequest(payload);

        if (!response) {
          throw new Error('Failed to create new post');
        }

        return response;
      } catch (error: any) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error.response.data?.message || 'An error occurred while creating the post');
        }
        throw error;
      }
    }
  });
};

export const useGetMessages = (id: string): UseQueryResult<TGetMessagesData, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-messages', id],
    queryFn: async () => {
      try {
        return await getMessagesRequest(id);
      } catch (error: any) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error.response.data?.message || 'An error occurred while fetching messages');
        }
        throw error;
      }
    }
  });

export const useCreateNewMessage = (): UseMutationResult<
  TGetMessagesData,
  TMetaErrorResponse,
  TCreateNewMessageBody
> => {
  return useMutation<TGetMessagesData, TMetaErrorResponse, TCreateNewMessageBody>({
    mutationKey: ['create-new-message'],
    mutationFn: async (payload: TCreateNewMessageBody) => {
      try {
        const response = await createNewMessageRequest(payload);

        if (!response) {
          throw new Error('Failed to send the message');
        }

        return response;
      } catch (error: any) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error.response.data?.message || 'An error occurred while sending the message');
        }
        throw error;
      }
    }
  });
};

export const useGetAllUsers = (): UseQueryResult<TGetAllUserData, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-all-users'],
    queryFn: async () => {
      try {
        return await getAllUsersRequest();
      } catch (error: any) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(error.response.data?.message || 'An error occurred while fetching users');
        }
        throw error;
      }
    }
  });
