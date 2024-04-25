export interface IReceivedMessageListRes {
  messageList: IReceivedMessageItem[];
}

export interface IReceivedMessageItem {
  messageId: number;
  sender: string;
  isRead: boolean;
  content: string;
  mood: string;
  tts: string;
  createdAt: string;
}
