import { NdJsonChatApi } from './NdJsonChatApi';
import { NdJsonChatService } from './NdJsonChatService';

describe('NdJsonChatService', () => {
  it('should work', () => {
    expect(new NdJsonChatService(new NdJsonChatApi('url'))).toBeInstanceOf(
      NdJsonChatService,
    );
  });
});
