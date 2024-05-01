export type ChatMessage = {
  content: string;
  role: 'user' | 'assistant';
};

export type ChatRequest = {
  messages: ChatMessage[];
  stream: boolean;
  context: {
    overrides: {
      top: number;
      retrieval_mode: 'hybrid';
      semantic_ranker: boolean;
      semantic_captions: boolean;
      suggest_followup_questions: boolean;
      use_oid_security_filter: boolean;
      use_groups_security_filter: boolean;
      semantic_kernel_mode: 'chains';
    };
  };
  approach: 'jos';
  session_state: null;
};

export class NdJsonChatApi {
  constructor(private readonly baseUrl: string) {}

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

    const response = await fetch(`${this.baseUrl}/api/chat`, {
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
