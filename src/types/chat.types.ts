export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  phoneNumber: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  badges?: string[];
  status?: string;
}

export interface ChatInfo {
  key: string;
  value: string;
}
