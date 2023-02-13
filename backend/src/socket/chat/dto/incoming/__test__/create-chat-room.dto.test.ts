import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateChatRoomDto } from '../create-chat-room.dto';

describe('CreateChatRoomDto', () => {
  it('public 인 경우 ', async () => {
    const result = validateSync(
      plainToInstance(CreateChatRoomDto, {
        roomTitle: 'name',
        isPrivate: false,
      }),
    );

    expect(result).toMatchInlineSnapshot(`Array []`);
  });

  it('private 인데 비밀번호 없는 경우 오류', async () => {
    const result = validateSync(
      plainToInstance(CreateChatRoomDto, {
        roomTitle: 'name',
        isPrivate: true,
      }),
    );

    expect(result).toMatchInlineSnapshot(`
      Array [
        ValidationError {
          "children": Array [],
          "constraints": Object {
            "isNotEmpty": "password should not be empty",
            "isString": "password must be a string",
          },
          "property": "password",
          "target": CreateChatRoomDto {
            "isPrivate": true,
            "roomTitle": "name",
          },
          "value": undefined,
        },
      ]
    `);
  });

  it('private 인데 비밀번호 있는경우', async () => {
    const result = validateSync(
      plainToInstance(CreateChatRoomDto, {
        roomTitle: 'name',
        isPrivate: true,
        password: 'asdf',
      }),
    );

    expect(result).toMatchInlineSnapshot(`Array []`);
  });
});
