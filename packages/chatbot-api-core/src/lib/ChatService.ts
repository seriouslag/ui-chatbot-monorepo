import { Observable } from 'rxjs';

export type MyMessage = {
  id: string;
  message: string;
  role: 'user';
};

export type SystemMessage = {
  id: string;
  message: string;
  role: 'info';
};

export type YourMessage = {
  id: string;
  message: string;
  role: 'assistant';
  isStreaming: boolean;
};
export type Message = MyMessage | YourMessage | SystemMessage;

export type ChatState = {
  messages: Message[];
  isStreaming: boolean;
};

export interface ChatService {
  chat(message: string): Promise<void>;
  state$: Observable<ChatState>;
}
