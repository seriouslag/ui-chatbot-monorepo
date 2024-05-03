import { NdJsonChatApi, ChatMessage, ChatRequest } from './NdJsonChatApi';

export type NdJsonChatApiImplOptions = {
  baseUrl: string;
};

export class NdJsonChatApiImpl implements NdJsonChatApi {
  constructor(private readonly options: NdJsonChatApiImplOptions) {}

  async chat(messages: ChatMessage[]) {
    const request: ChatRequest = {
      messages,
      stream: true,
      context: {
        overrides: {
          top: 3,
          retrieval_mode: 'hybrid',
          semantic_ranker: true,
          semantic_captions: false,
          suggest_followup_questions: false,
          use_oid_security_filter: false,
          use_groups_security_filter: false,
          semantic_kernel_mode: 'chains',
        },
      },
      approach: 'jos',
      session_state: null,
    };

    const headers: HeadersInit = {
      accept: 'application/x-ndjson',
      'content-type': 'application/json',
    };

    const response = await fetch(this.options.baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to chat');
    }

    const responseBody = response.body;

    if (!responseBody) {
      throw new Error('Failed to read response body');
    }

    return responseBody;
  }
}
