import { Room } from 'src/modules/rooms/entities/room.entity';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
    private readonly userServ: UsersService,
  ) {}

  async create(
    createRoomDto: CreateRoomDto,
    user_payload: { id: string; username: string; iat: number },
  ) {
    //check if user has an alreayd created room
    const user = await this.userServ.findOneById(user_payload.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(user);

    if (user && user.room !== null) {
      throw new BadRequestException('User already has a room');
    }

    // add room name if doesnt exist
    if (createRoomDto.name === undefined)
      createRoomDto.name = `${user_payload.username}'s room`;

    // create room
    const room = this.roomRepo.create({
      ...createRoomDto,
      hostUser: user,
      players: [user],
    });

    const newRoom = await this.roomRepo.save(room);

    if (user && user.room === null) {
      const test = await this.userServ.updateUserRoom(user.id, room);

      console.log(test);
    }

    return newRoom;
  }

  findAll() {
    return this.roomRepo.find();
  }

  findOne(id: string) {
    return this.roomRepo.findOne({ where: { id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async remove(id: string) {
    const result = await this.roomRepo.delete(id);
    return result;
  }
}
