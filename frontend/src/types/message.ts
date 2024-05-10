import { moodType } from './model';

export interface IReceivedMessageListRes {
  messageList: IReceivedMessageItem[];
}

export interface IReceivedMessageItem {
  messageId: number;
  sender: string;
  isRead: boolean;
  content: string;
  mood: moodType;
  tts: string;
  createdAt: string;
}

export interface IMessageSendReq {
  receiverId: number;
  content: string;
}
