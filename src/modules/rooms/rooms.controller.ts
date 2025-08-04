import { JwtStrategy } from './../auth/jwt.startegy';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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
import { JwtAuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
    @InjectRepository(Room) public readonly roomRepo: Repository<Room>,
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createRoom(
    @Headers('Authorization') auth: string,
    @Body() data: CreateRoomDto,
  ) {
    const user = getUserFromToken(getTokenFromAuthHeader(auth));
    return this.roomsService.create(data, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  fetchAllRooms() {
    return this.roomsService.findAll();
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Request() req) {
    const user = await this.usersService.findOneById(req.user.userId);
    console.log(user);

    const roomId = user?.room?.id;
    if (roomId === undefined) {
      throw new BadRequestException('User has no room');
    }
    const result = await this.roomsService.remove(roomId);
  }
}
