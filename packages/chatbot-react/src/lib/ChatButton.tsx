import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useObservableState } from 'observable-hooks';
import type { ChatService } from '@seriouslag/chatbot-api-core';
import { ChatBox, type ChatBoxOptions } from './ChatBox';

type ChatStatus = 'good' | 'warning' | 'error';

type ChatOptions = Pick<
  ChatBoxOptions,
  | 'botName'
  | 'botAvatar'
  | 'botDescription'
  | 'inputTextPlaceholder'
  | 'sendButtonText'
>;

export type ChatButtonProps = {
  service: ChatService;
} & ChatOptions;

export const ChatButton = ({ service, ...rest }: ChatButtonProps) => {
  const [showChat, setShowChat] = useState(false);

  const [chatStatus, setChatStatus] = useState<ChatStatus>('good');
  const { messages, isStreaming } = useObservableState(service.state$, {
    messages: [],
    isStreaming: false,
  });

  const [isFirstRender, setIsFirstRender] = useState(true);

  const scrollElementIntoView = (element: HTMLElement) => {
    const firstRender = isFirstRender;
    if (isFirstRender) {
      setIsFirstRender(false);
    }
    // scroll to the new message
    // if it's the first render, scroll instantly
    // otherwise, scroll smoothly
    element.scrollIntoView({ behavior: firstRender ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;
    const lastMessageId = lastMessage.id;
    const newMessage = document.getElementById(`message-${lastMessageId}`);
    if (newMessage) {
      scrollElementIntoView(newMessage);
    }
    // open the chat if the new message is not of type info
    if (lastMessage.role !== 'info') {
      setShowChat(true);
    }
  }, [messages]);

  const chatInputId = 'chat-message-input';

  const focusChatInput = () => {
    const chatInput = document.getElementById(chatInputId);
    if (chatInput) {
      chatInput.focus();
    }
  };

  useEffect(() => {
    if (showChat) {
      focusChatInput();
    }
  }, [showChat]);

  const [value, setValue] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage();
  };

  const sendMessage = async () => {
    if (!value) return;
    // save the value in case of error
    const savedValue = value;
    try {
      // clear the input
      setValue('');
      if (chatStatus === 'error') {
        setChatStatus('warning');
      }
      console.log('Sending message...');
      await service.chat(savedValue);
      setChatStatus('good');
    } catch (e) {
      setChatStatus('error');
      // restore the value on error.
      setValue(savedValue);
      console.error('Error sending message.', e);
    }
  };

  const getStatusClass = (status: ChatStatus) => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
    }
  };

  const statusColor = getStatusClass(chatStatus);

  return (
    <div className="fixed bottom-4 left-4">
      <Slide direction="right" in={showChat} unmountOnExit mountOnEnter>
        <div className="m b-2">
          <ChatBox
            setShowChat={setShowChat}
            messages={messages}
            isStreaming={isStreaming}
            value={value}
            setValue={setValue}
            chatInputId={chatInputId}
            handleSubmit={handleSubmit}
            statusColor={statusColor}
            {...rest}
          />
        </div>
      </Slide>
      <Fab
        className="float-left"
        color="primary"
        aria-label="Chat"
        onClick={() => {
          setShowChat(!showChat);
        }}
      >
        {showChat ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </div>
  );
};
