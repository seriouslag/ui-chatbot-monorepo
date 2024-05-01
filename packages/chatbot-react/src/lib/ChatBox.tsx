import Paper from '@mui/material/Paper';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { type Message } from '@seriouslag/chatbot-api-core';
import { useMemo } from 'react';
import { MyMessageBubble } from './MyMessageBubble';
import { YourMessageBubble } from './YourMessageBubble';

export type ChatBoxOptions = {
  setShowChat: (showChat: boolean) => void;
  messages: Message[];
  isStreaming: boolean;
  value: string;
  setValue: (value: string) => void;
  chatInputId: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  statusColor: string;
  botAvatar?: React.ReactNode;
  botName?: string;
  botDescription: string;
  userAvatar?: React.ReactNode;
  inputTextPlaceholder?: string;
  sendButtonText?: string;
};

export const ChatBox = ({
  setShowChat,
  messages,
  isStreaming,
  value,
  setValue,
  chatInputId,
  handleSubmit,
  statusColor,
  botAvatar,
  botName,
  botDescription,
  userAvatar,
  inputTextPlaceholder = 'Type a message...',
  sendButtonText = 'Send',
}: ChatBoxOptions) => {
  const calculatedBotAvatar = useMemo(
    () => botAvatar || <SmartToyIcon />,
    [botAvatar],
  );
  const calculatedUserAvatar = useMemo(
    () => userAvatar || <SmartToyIcon />,
    [userAvatar],
  );

  return (
    <Paper elevation={10}>
      <div
        tabIndex={0}
        role="dialog"
        aria-label="Chat"
        aria-roledescription="Chat with Cash Bot"
        className="p:2 flex flex-1 flex-col justify-between sm:p-6"
        onKeyDown={(e) => {
          // if user presses escape key, close the chat
          if (e.key === 'Escape') {
            setShowChat(false);
          }
        }}
      >
        <div className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <Avatar>{calculatedBotAvatar}</Avatar>
              <span
                className={`absolute -bottom-1.5 -right-1.5 ${statusColor}`}
              >
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="mt-1 flex items-center text-2xl">
                <span className="mr-3 text-gray-700">{botName}</span>
              </div>
              {botDescription && (
                <span className="text-lg text-gray-600">{botDescription}</span>
              )}
            </div>
          </div>
        </div>
        <div
          id="messages"
          className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex max-h-96 flex-col space-y-4 overflow-y-auto p-3"
        >
          {messages.map((message) => (
            <div
              className="chat-message"
              key={message.id}
              id={`message-${message.id}`}
            >
              {message.role === 'user' ? (
                <MyMessageBubble
                  message={message}
                  userAvatar={calculatedUserAvatar}
                />
              ) : (
                <YourMessageBubble
                  message={message}
                  botAvatar={calculatedBotAvatar}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
          <form onSubmit={(e) => handleSubmit(e)} className="relative flex">
            <TextField
              id={chatInputId}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              placeholder={inputTextPlaceholder}
              className="w-full rounded-md bg-gray-200 py-3 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
            />
            <LoadingButton
              loading={isStreaming}
              disabled={isStreaming}
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">{sendButtonText}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-6 w-6 rotate-90 transform"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </LoadingButton>
          </form>
        </div>
      </div>
    </Paper>
  );
};
