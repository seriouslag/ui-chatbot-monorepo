import { NdJsonChatApiImpl } from './NdJsonChatApiImpl';
import { NdJsonChatService } from './NdJsonChatService';

describe('NdJsonChatService', () => {
  it('should work', () => {
    expect(
      new NdJsonChatService(
        new NdJsonChatApiImpl({
          baseUrl: 'url',
        }),
      ),
    ).toBeInstanceOf(NdJsonChatService);
  });
});
