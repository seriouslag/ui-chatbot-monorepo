import { ChatButton } from '@seriouslag/chatbot-react';
import { ChatServiceInstance } from './Singletons';

function App() {
  return (
    <>
      <div>
        <h1>ChatBot</h1>
        <p>Click the button below to chat with the ChatBot.</p>
      </div>
      <ChatButton
        service={ChatServiceInstance}
        botName="ChatBot"
        botDescription="Chat with me!"
        inputTextPlaceholder="Type a message..."
        sendButtonText="Send"
      />
    </>
  );
}

export default App;
