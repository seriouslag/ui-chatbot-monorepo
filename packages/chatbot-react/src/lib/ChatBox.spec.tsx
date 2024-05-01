import { vi } from 'vitest';
import { render } from '@testing-library/react';

import { ChatBox } from './ChatBox';

describe('ChatBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ChatBox
        isStreaming={false}
        messages={[]}
        value=""
        setValue={vi.fn()}
        setShowChat={vi.fn()}
        botName="botName"
        botAvatar="botAvatar"
        botDescription="botDescription"
        inputTextPlaceholder="inputTextPlaceholder"
        sendButtonText="sendButtonText"
        chatInputId={'chatInputId'}
        handleSubmit={vi.fn()}
        statusColor="good"
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
