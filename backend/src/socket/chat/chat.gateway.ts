import { Logger, UseFilters } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsExceptionFilter } from '../../common/filter/ws-exception.filter';
import { ConnectionHandleService } from '../connection-handle';
import { ChatMessageDto } from './dto/incoming/chat-message.dto';
import { CreateChatRoomDto } from './dto/incoming/create-chat-room.dto';
import { JoinChatRoomDto } from './dto/incoming/join-chat-room.dto';
import { LeaveChatRoomDto } from './dto/incoming/leave-chat-room.dto';
import { UpdateChatRoomDto } from './dto/incoming/update-chat-room.dto';
import { ChatRoomService } from './service/chat-room.service';
import { ChatUserService } from './service/chat-user.service';
import { UserConnectionService } from './service/user-connection.service';
import { SocketWithUser } from './types/SocketWithUser';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(
    private readonly connectionHandleService: ConnectionHandleService,
    private readonly userConnectionService: UserConnectionService,
    private readonly chatRoomService: ChatRoomService,
    private readonly chatUserService: ChatUserService,
  ) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('create_room')
  createRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: CreateChatRoomDto,
  ): void {
    this.logger.verbose(`createRoom: ${JSON.stringify(data)}`);

    this.chatRoomService.createChatRoom(client.user.id, data);
    this.emitChatRooms();
    client.emit('join_room');
  }

  @SubscribeMessage('get_chat_rooms')
  getChatRooms() {
    this.emitChatRooms();
  }

  @SubscribeMessage('update_room')
  updateRoom(
    @ConnectedSocket() { user }: SocketWithUser, //
    @MessageBody() data: UpdateChatRoomDto,
  ): void {
    this.logger.verbose(`updateRoom: ${JSON.stringify(data)}`);

    this.chatRoomService.updateChatRoom(user.id, data.chatRoomId, data);
    this.emitChatRooms();
  }

  @SubscribeMessage('join_room')
  joinRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: JoinChatRoomDto,
  ): void {
    this.logger.verbose(`joinRoom: ${JSON.stringify(data)}`);

    this.chatUserService.joinChatRoom(data.chatRoomId, client.user.id);
    this.emitChatRooms();
    client.emit('join_room');
  }

  @SubscribeMessage('leave_room')
  leaveRoom(
    @ConnectedSocket() { user }: SocketWithUser, //
    @MessageBody() data: LeaveChatRoomDto,
  ): void {
    this.logger.verbose(`leaveRoom: ${JSON.stringify(data)}`);

    this.chatUserService.leaveChatRoom(data.chatRoomId, user.id);
    this.emitChatRooms();
  }

  @SubscribeMessage('chat_message')
  emitChatData(
    @ConnectedSocket() { user }: SocketWithUser, //
    @MessageBody() data: ChatMessageDto,
  ): void {
    const chatRoom = this.chatUserService.getJoinedChatRoom(user.id);
    const chatData = this.chatUserService.getChatData(user.id, data.message, data.timestamp);

    this.chatUserService.getChatUsersSocketId(chatRoom.id).forEach(socketId => {
      this.io.to(socketId).emit('chat_message', chatData);
    });
  }

  async emitChatRooms(): Promise<void> {
    const chatRoom = await this.chatRoomService.getChatRooms();

    this.logger.verbose(`emitChatRooms: ${JSON.stringify(chatRoom)}`);

    this.io.emit('update_chat_room', chatRoom);
  }

  async handleConnection(client: SocketWithUser): Promise<void> {
    await this.connectionHandleService.handleConnection(client);
    this.userConnectionService.userConnected(client.user.id, client.id);
    this.emitChatRooms();
  }

  handleDisconnect(client: SocketWithUser): void {
    this.userConnectionService.userDisconnected(client.user.id);
    this.connectionHandleService.handleDisconnect(client);
    this.emitChatRooms();
  }
}
