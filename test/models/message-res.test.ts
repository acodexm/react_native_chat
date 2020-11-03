import { MessageRes } from '@models';
import { TypedJSON } from 'typedjson';
import { MessageType } from '@models/enums';

describe('Message model', () => {
  it('it can be created', () => {
    expect(MessageRes).toBeTruthy();
  });
  it('deserialize enum class', () => {
    const message = TypedJSON.parse({ type: 'TEXT' }, MessageRes);
    expect(message?.type === MessageType.TEXT).toBe(true);
  });
});
