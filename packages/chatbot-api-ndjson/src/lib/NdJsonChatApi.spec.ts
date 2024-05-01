import { NdJsonChatApi } from './NdJsonChatApi';

describe('NdJsonChatApi', () => {
  it('should work', () => {
    expect(new NdJsonChatApi('url')).toBeInstanceOf(NdJsonChatApi);
  });
});
