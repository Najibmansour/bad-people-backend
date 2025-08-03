import { JwtStrategy } from './../auth/jwt.startegy';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
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

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomsService: RoomsService,
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
  fetchAllRooms(
    @Headers('Authorization') auth: string,
    @Body() data: CreateRoomDto,
  ) {
    // const user = getUserFromToken(getTokenFromAuthHeader(auth));
    // if (!user) throw UnauthorizedException;
    // return this.roomsService.findAll();
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    const result = await this.roomsService.remove(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
