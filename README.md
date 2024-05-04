# @seriouslag/react-chatbot

A simple chatbot component for React to interface with AI chats.
It uses @MUI for some of the components.
Internally uses tailwindcss for styling.

[![npm version](https://badge.fury.io/js/@seriouslag%2Fchatbot-react.svg)](https://badge.fury.io/js/@seriouslag%2Fchatbot-react)

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

- [x] Split service and components into separate packages
- [ ] Add Unit tests
- [ ] Add example page
- [ ] Remove MUI dependencies
- [ ] Replace RXJS with native JS
- [ ] Determine if using tailwindcss is good idea for a library
- [ ] Split NdJsonChatApi Implementation into a separate package

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
const chatApi = new NdJsonChatApiImpl({
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

## Development

```bash
# install dependencies
npm install
```

```bash
# run local development server
npm run dev
```

```bash
# build the package
npm run build
```

## License

MIT

## Publish

```bash
nx release --skip-publish
```

on macos the generated package-lock.json is broken,
Undo last commit, delete package-lock.json and run `npm install` to fix it.
Commit, push, and push the tag of the new version

```bash
git push origin tag <version>
```
