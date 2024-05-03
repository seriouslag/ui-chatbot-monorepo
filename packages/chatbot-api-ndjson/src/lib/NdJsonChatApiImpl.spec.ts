import { NdJsonChatApiImpl } from './NdJsonChatApiImpl';

describe('NdJsonChatApiImpl', () => {
  it('should work', () => {
    expect(
      new NdJsonChatApiImpl({
        baseUrl: 'url',
      }),
    ).toBeInstanceOf(NdJsonChatApiImpl);
  });
});
