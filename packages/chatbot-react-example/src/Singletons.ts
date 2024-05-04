import { ChatService } from '@seriouslag/chatbot-api-core';
import {
  NdJsonChatApiImpl,
  NdJsonChatService,
} from '@seriouslag/chatbot-api-ndjson';

/**
 * Singleton instance of the ChatService.
 */
export const ChatServiceInstance: ChatService = new NdJsonChatService(
  new NdJsonChatApiImpl({
    baseUrl: import.meta.env.VITE_NDJSON_URL,
  }),
  {
    defaultMessages: [
      {
        id: '0',
        message: 'Hello! How can I help you?',
        role: 'info',
      },
    ],
  },
);
