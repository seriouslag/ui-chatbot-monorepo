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

export type NdJsonChatApi = {
  chat(messages: ChatMessage[]): Promise<ReadableStream<Uint8Array>>;
};
