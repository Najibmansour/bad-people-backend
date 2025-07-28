import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/jwt-auth.strategy';
import {
  getTokenFromClient,
  getUserFromToken,
} from 'src/utils/user/getUserRow';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';

@WebSocketGateway(3002, {
  cors: {
    origin: '*', // or specify your frontend URL
  },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly jwtServ: JwtService,
    @InjectRepository(Room) public readonly roomRepo: Repository<Room>,
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {}

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('createRoom')
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createRoomDto: CreateRoomDto,
  ) {
    const user_info = getUserFromToken(getTokenFromClient(client));

    const user = this.userRepo.findOne({ where: { id: user_info.id } });

    return user;
  }

  @SubscribeMessage('findAllRooms')
  findAll() {
    return this.roomsService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: string) {
    return this.roomsService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  update(@MessageBody() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(1, updateRoomDto);
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: number) {
    return this.roomsService.remove(id);
  }
}
