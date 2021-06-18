export interface BilimModalType {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  categoryName?: string;
  rating?: number;
  videoCount?: number;
  testCount?: number;
  views?: number;
  likes?: number;
}

export interface VideoModalType {
  id: string;
  thumbnail: string;
  name: string;
  videoUrl: string;
  description: string;
  length?: string;
  order?: number;
}

export interface TestModalType {
  id: string;
  name: string;
  questions: number;
  icon: string;
  description: string;
}

export interface QuestionModalType {
  id: string;
  answer: number;
  question: string;
  varA: string;
  varB: string;
  varC: string;
  varD: string;
  varE?: string;
  photo?: string;
  description: string;
}

export interface CityModalType {
  id: string;
  name: string;
  nameRus: string;
  nameEn: string;
  icon: string;
}

export interface ChatModalType {
  chatId: string;
  chatType: number;
  lastMessage: string;
  lastMessageRead: boolean;
  lastMessageSender: string;
  lastMessageTime: any;
  lastMessageType: number;
  user: any[];
}

export interface MessageModalType {
  messageText: string;
  messageType: number;
  read: boolean;
  receiverUid: string;
  replyUid: string;
  senderName: string;
  senderUid: string;
  time: any;
  userPhoto: string;
}
