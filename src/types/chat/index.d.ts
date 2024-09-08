import { TMetaResponse, TMetaResponseSingle } from '@/types';

export interface TGetChatsByUser {
  id: number;
  name: string | null;
  type: string;
  me: Me;
  partner: Partner[];
  latestMessage: LatestMessage;
  created_at: string;
}

export interface Me {
  id: number;
  name: string | null;
}

export interface Partner {
  id: number;
  name: string | null;
  joined_at: string;
  role: string;
}

export interface LatestMessage {
  id: number;
  content: string;
  sender: Sender;
  created_at: string;
}

export interface Sender {
  id: number;
  name: string | null;
}

export interface Message {
  id: number;
  content: string;
  sender: Sender;
  created_at: string;
}

export interface TGetChatById {
  id: number;
  name: string | null;
  type: string;
  me: Me;
  partner: Partner[];
  messages: Message[];
  created_at: string;
}

export interface TCreateNewChatBody {
  name: string;
  type: string;
  recipient_id: number;
}

export interface TCreateNewChat {
  id: number;
  type: string;
  updatedAt: string;
  createdAt: string;
  name: string | null;
}

export interface TGetMessage {
  id: number;
  content: string;
  sender: Sender;
  created_at: string;
}

export interface TCreateNewMessage {
  id: number;
  content: string;
  sender: Sender;
  created_at: string;
}

export interface TCreateNewMessageBody {
  chat_id: number;
  content: string;
}

export type TGetChatsByUserData = TMetaResponse<TGetChatsByUser>;
export type TGetChatByIdData = TMetaResponseSingle<TGetChatById>;
export type TCreateNewChatData = TMetaResponseSingle<TCreateNewChat>;
export type TGetMessagesData = TMetaResponse<TGetMessages>;
export type TCreateNewMessageData = TMetaResponseSingle<TCreateNewMessage>;
