# @seriouslag/chatbot-react

A simple chatbot component for React to interface with AI chats.
It uses @MUI for some of the components.
Internally uses tailwindcss for styling.

[![npm version](https://badge.fury.io/js/%40seriouslag%2Fchatbot-react.svg)](https://badge.fury.io/js/%40seriouslag%2Fchatbot-react)

![Demo](https://github.com/seriouslag/ui-chatbot-monorepo/blob/main/images/demo.gif?raw=true)

Peer dependencies include:

- react
- react-dom
- @mui/material
- @mui/icons-material
- @mui/lab
- rxjs

Currently only one service is available, the NdJsonChatService, which is a chat service that sends messages to a server that accepts NDJSON messages.

The chat service is a simple interface that can be implemented to send messages to a chat server.

- [ ] Split service and components into separate packages
- [ ] Add Unit tests
- [ ] Add example page
- [ ] Remove MUI dependencies
- [ ] Replace RXJS with native JS

## Installation

```bash
npm install @seriouslag/chatbot-react @seriouslag/chatbot-api-ndjson
```

## Usage

```jsx
import {
  NdJsonChatApiImpl,
  NdJsonChatService,
} from '@seriouslag/chatbot-api-ndjson';
import { ChatButton } from '@seriouslag/chatbot-react';
import { v4 } from 'uuid';
// load the css
import '@seriouslag/chatbot-react/css';

// setup the API
const chatApi = new NdJsonChatApi({
  baseUrl: 'http://localhost:3000/api/chat',
});
// setup the chat service
const chatServiceInstance = new NdJsonChatService(chatApi, {
  defaultMessages: [
    {
      id: v4(),
      message: 'Hello! How can I help you?',
      role: 'info',
    },
  ],
});

const App = () => {
  return (
    <ChatButton
      service={chatServiceInstance}
      botName="ChatBot"
      botDescription="Chat with me!"
      inputTextPlaceholder="Type a message..."
      sendButtonText="Send"
    />
  );
};

export default App;
```
