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
import { SocketWithUser } from '../../common/auth/socket-jwt-auth/SocketWithUser';
import { WsExceptionFilter } from '../../common/filter/ws-exception.filter';
import { ConnectionHandleService } from '../connection-handle';
import { OnlineGateway } from '../online';
import { ChatMessageDto } from './dto/incoming/chat-message.dto';
import { CreateChatRoomDto } from './dto/incoming/create-chat-room.dto';
import { JoinChatRoomDto } from './dto/incoming/join-chat-room.dto';
import { OperateTargetDto } from './dto/incoming/operate-target.dto';
import { UpdateChatRoomDto } from './dto/incoming/update-chat-room.dto';
import { ChatRoomService } from './service/chat-room.service';
import { ChatUserOperateService } from './service/chat-user-operate.service';
import { ChatUserService } from './service/chat-user.service';

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
    private readonly chatUserOperateService: ChatUserOperateService,
    private readonly onlineGateway: OnlineGateway,
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
    this.chatRoomService.updateChatRoom(client.id, data.id, data);
    this.logger.verbose(`${client.user.nickname} updateRoom: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('join_room')
  public joinRoom(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: JoinChatRoomDto,
  ): void {
    this.chatUserService.joinChatRoom(data.id, client.id, client.user.id, data.password);

    this.logger.verbose(`${client.user.nickname} joinRoom: ${JSON.stringify(data)}`);

    this.emitChatRooms();
    this.emitJoinRoom(client, data.id);
  }

  @SubscribeMessage('leave_room')
  public leaveRoom(
    @ConnectedSocket() client: SocketWithUser, //
  ): void {
    this.chatUserService.leaveAllChatRooms(client.id);

    this.logger.verbose(`${client.id} leaveRoom}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('chat_message')
  public async emitChatData(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: ChatMessageDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    const chatData = await this.chatUserService.createChatData(client.id, data.message, data.timestamp);

    this.logger.verbose(`${client.user.nickname} chatMessage: ${JSON.stringify(data)}`);

    Array.from(chatRoom.sockets.keys()).forEach(socketId => {
      this.io.to(socketId).emit('chat_message', chatData);
    });
  }

  @SubscribeMessage('give_operator')
  public async giveOperator(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: OperateTargetDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    this.chatUserOperateService.giveOperatorRole(chatRoom.id, client.user.id, data.userId);

    this.logger.verbose(`${client.user.nickname} giveOperator: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('take_operator')
  public async takeOperator(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: OperateTargetDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    this.chatUserOperateService.takeOperatorRole(chatRoom.id, client.user.id, data.userId);

    this.logger.verbose(`${client.user.nickname} takeOperator: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('mute_user')
  public async muteUser(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: OperateTargetDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    this.chatUserOperateService.muteUser(chatRoom.id, client.user.id, data.userId);

    this.logger.verbose(`${client.user.nickname} muteUser: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('unmute_user')
  public async unmuteUser(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: OperateTargetDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    this.chatUserOperateService.unmuteUser(chatRoom.id, client.user.id, data.userId);

    this.logger.verbose(`${client.user.nickname} unmuteUser: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('kick_user')
  public async kickUser(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: OperateTargetDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    this.chatUserOperateService.kickUser(chatRoom.id, client.user.id, data.userId);

    this.logger.verbose(`${client.user.nickname} kickUser: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('ban_user')
  public async banUser(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: OperateTargetDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    this.chatUserOperateService.banUser(chatRoom.id, client.user.id, data.userId);

    this.logger.verbose(`${client.user.nickname} banUser: ${JSON.stringify(data)}`);

    this.emitChatRooms();
  }

  @SubscribeMessage('unban_user')
  public async unbanUser(
    @ConnectedSocket() client: SocketWithUser, //
    @MessageBody() data: OperateTargetDto,
  ): Promise<void> {
    const chatRoom = this.chatUserService.getJoinedChatRoom(client.id);
    this.chatUserOperateService.unbanUser(chatRoom.id, client.user.id, data.userId);

    this.logger.verbose(`${client.user.nickname} unbanUser: ${JSON.stringify(data)}`);

    this.emitChatRooms();
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
    await this.onlineGateway.emitOnlineUsers();
  }

  public emitInviteRoom(toSocketId: string, gameRoomId: string, nickname: string): void {
    this.logger.verbose(`${toSocketId} emitInviteRoom: ${gameRoomId} ${nickname}`);

    this.io.to(toSocketId).emit('invite_room', {
      id: gameRoomId,
      nickname,
    });
  }

  public async handleConnection(client: SocketWithUser): Promise<void> {
    const isUserConnected = await this.connectionHandleService.handleConnection(client);

    if (isUserConnected) {
      this.emitChatRooms();
    }
  }

  public handleDisconnect(client: SocketWithUser): void {
    const isUserDisconnected = this.connectionHandleService.handleDisconnect(client);

    if (isUserDisconnected) {
      this.chatUserService.leaveAllChatRooms(client.id);
      this.emitChatRooms();
    }
  }
}
