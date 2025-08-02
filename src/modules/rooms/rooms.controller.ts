import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import {
  getTokenFromAuthHeader,
  getTokenFromClient,
  getUserFromToken,
} from 'src/utils/user/getUserRow';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomsService: RoomsService,
    @InjectRepository(Room) public readonly roomRepo: Repository<Room>,
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}

  @Post()
  getHeaders(
    @Headers('Authorization') auth: string,
    @Body() data: CreateRoomDto,
  ) {
    const user = getUserFromToken(getTokenFromAuthHeader(auth));

    return this.roomsService.create(data, user);
  }
}
