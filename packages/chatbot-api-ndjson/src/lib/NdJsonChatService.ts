import readNDJSONStream from 'ndjson-readablestream';
import { BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
import { ChatMessage, NdJsonChatApi } from './NdJsonChatApi';
import type {
  ChatService,
  ChatState,
  MyMessage,
  SystemMessage,
} from '@seriouslag/chatbot-api-core';

export type ServiceOptions = {
  defaultMessages?: SystemMessage[];
};

export class NdJsonChatService implements ChatService {
  readonly #state: BehaviorSubject<ChatState>;

  constructor(
    private readonly api: NdJsonChatApi,
    { defaultMessages }: ServiceOptions = {},
  ) {
    this.#state = new BehaviorSubject<ChatState>({
      messages: defaultMessages ?? [],
      isStreaming: false,
    });
  }

  async chat(message: string) {
    if (!message) {
      console.log('No message to send... Not sending.');
      return;
    }
    if (this.#state.value.isStreaming) {
      console.log('Already streaming... Not sending.');
      return;
    }
    // add my message to the list of messages
    const responseId = v4();
    const newMessage: MyMessage = {
      id: v4(),
      message,
      role: 'user',
    };
    try {
      const messages = [...this.#state.value.messages, newMessage]
        .filter((m) => m.role !== 'info')
        .map(
          (m) =>
            ({
              content: m.message,
              role: m.role,
            }) as ChatMessage,
        );
      this.#state.next({
        ...this.#state.value,
        isStreaming: true,
        messages: [
          ...this.#state.value.messages,
          newMessage,
          {
            id: responseId,
            message: '',
            role: 'assistant',
            isStreaming: true,
          },
        ],
      });
      const response = await this.api.chat(messages);
      for await (const event of readNDJSONStream(response)) {
        if (event?.choices?.[0]?.context?.data_points) {
          console.log('event 1', event);
        } else if (event.choices?.[0]?.delta?.content) {
          console.log('event 2', event);

          const currentMessage =
            this.#state.value.messages.filter((m) => m.id === responseId)?.[0]
              ?.message ?? '';
          const newMessage = currentMessage + event.choices[0].delta.content;

          this.#state.next({
            ...this.#state.value,
            isStreaming: true,
            messages: [
              ...this.#state.value.messages.filter((m) => m.id !== responseId),
              {
                id: responseId,
                message: newMessage,
                role: 'assistant',
                isStreaming: true,
              },
            ],
          });
        } else {
          console.log('event 3', event);
        }
      }
      const finalMessage = this.#state.value.messages.filter(
        (m) => m.id === responseId,
      )?.[0]?.message;
      if (!finalMessage) {
        throw new Error('Failed to get final message');
      }
      this.#state.next({
        ...this.#state.value,
        messages: [
          ...this.#state.value.messages.filter((m) => m.id !== responseId),
          {
            id: responseId,
            message: finalMessage,
            role: 'assistant',
            isStreaming: false,
          },
        ],
        isStreaming: false,
      });
    } catch (e) {
      console.error('Error sending message', e);
      this.#state.next({
        ...this.#state.value,
        isStreaming: false,
        messages: [
          ...this.#state.value.messages.filter((m) => m.id !== responseId),
          {
            id: responseId,
            message: 'Error sending message',
            role: 'info',
          },
        ],
      });
      // bubble up the error
      throw e;
    }
  }

  get state$() {
    return this.#state.asObservable();
  }
}
