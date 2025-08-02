import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
  ) {}

  create(
    createRoomDto: CreateRoomDto,
    user: { id: string; username: string; iat: number },
  ) {
    console.log(user);

    // add room name if doesnt exist
    if (createRoomDto.name === undefined)
      createRoomDto.name = `${user.username}'s room`;

    const room = this.roomRepo.create({ ...createRoomDto });

    return this.roomRepo.save(room);
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

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
