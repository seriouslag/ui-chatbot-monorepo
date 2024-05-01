import Avatar from '@mui/material/Avatar';
import type { SystemMessage, YourMessage } from '@seriouslag/chatbot-api-core';
import DOMPurify from 'dompurify';
import { ReactNode, useMemo } from 'react';
import { parseAnswerToHtml } from './MessageParser';

export const YourMessageBubble = ({
  message,
  botAvatar,
}: {
  message: YourMessage | SystemMessage;
  botAvatar: ReactNode;
}) => {
  const isStreaming = 'isStreaming' in message ? message.isStreaming : false;
  const parsedAnswer = useMemo(
    () => parseAnswerToHtml(message.message, isStreaming),
    [message, isStreaming],
  );

  const sanitizedAnswerHtml = `${DOMPurify.sanitize(parsedAnswer.answerHtml)}${isStreaming ? '...' : ''}`;
  return (
    <div className="flex items-end">
      <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
        <div>
          <span
            dangerouslySetInnerHTML={{
              __html: sanitizedAnswerHtml,
            }}
            className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-left text-gray-600"
          />
        </div>
      </div>
      <Avatar>{botAvatar}</Avatar>
    </div>
  );
};
