import { ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import type { MyMessage } from '@seriouslag/chatbot-api-core';

export const MyMessageBubble = ({
  message,
  userAvatar,
}: {
  message: MyMessage;
  userAvatar: ReactNode;
}) => {
  return (
    <div className="flex items-end justify-end">
      <div className="mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
        <div>
          <span className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-right text-white">
            {message.message}
          </span>
        </div>
      </div>
      <Avatar>{userAvatar}</Avatar>
    </div>
  );
};
