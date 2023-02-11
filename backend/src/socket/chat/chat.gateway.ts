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
import { SocketWithUser } from './types/SocketWithUser';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(
    private readonly connectionHandleService: ConnectionHandleService,
    private readonly chatRoomService: ChatRoomService,
    private readonly chatUserService: ChatUserService,
  ) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('create_room')
  public createRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: CreateChatRoomDto,
  ): void {
    const chatRoom = this.chatRoomService.createChatRoom(client.id, client.user.id, data);

    this.logger.verbose(`${client.user.nickname} createRoom: ${JSON.stringify(chatRoom)}`);

    this.emitChatRooms();
    this.emitJoinRoom(client, chatRoom.id);
  }

  @SubscribeMessage('update_room')
  public updateRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: UpdateChatRoomDto,
  ): void {
    this.chatRoomService.updateChatRoom(client.id, data.chatRoomId, data);
    this.logger.verbose(`${client.user.nickname} updateRoom: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('join_room')
  public joinRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: JoinChatRoomDto,
  ): void {
    this.chatUserService.joinChatRoom(data.id, client.id, client.user.id);

    this.logger.verbose(`${client.user.nickname} joinRoom: ${JSON.stringify(data)}`);

    this.emitChatRooms();
    this.emitJoinRoom(client, data.id);
  }

  @SubscribeMessage('leave_room')
  public leaveRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: LeaveChatRoomDto,
  ): void {
    this.chatUserService.leaveChatRoom(data.id, client.id);

    this.logger.verbose(`${client.user.nickname} leaveRoom: ${JSON.stringify(data)}`);

    // this.emitLeaveRoom(client, data.chatRoomId);
    this.emitChatRooms();
  }

  @SubscribeMessage('chat_message')
  public async emitChatData(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: ChatMessageDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    const chatData = await this.chatUserService.getChatData(client.id, data.message, data.timestamp);

    this.logger.verbose(`${client.user.nickname} chatMessage: ${JSON.stringify(data)}`);

    Array.from(chatRoom.sockets.keys()).forEach(socketId => {
      this.io.to(socketId).emit('chat_message', chatData);
    });
  }

  public async emitJoinRoom(client: SocketWithUser, chatRoomId: string): Promise<void> {
    const chatRoom = await this.chatRoomService.getChatRooms();

    this.logger.verbose(`${client.user.nickname} emitJoinRoom: ${chatRoomId}`);

    this.io.to(client.id).emit('update_chat_room', chatRoom);
    this.io.to(client.id).emit('join_room', chatRoomId);
  }

  public async emitChatRooms(): Promise<void> {
    const chatRoom = await this.chatRoomService.getChatRooms();

    this.logger.verbose(`emitChatRooms: ${JSON.stringify(chatRoom)}`);

    this.io.emit('update_chat_room', chatRoom);
  }

  public async handleConnection(client: SocketWithUser): Promise<void> {
    const isConnected = await this.connectionHandleService.handleConnection(client);

    if (isConnected) {
      this.emitChatRooms();
    }
  }

  public handleDisconnect(client: SocketWithUser): void {
    this.chatUserService.leaveAllChatRooms(client.id);
    this.connectionHandleService.handleDisconnect(client);
    this.emitChatRooms();
  }
}
