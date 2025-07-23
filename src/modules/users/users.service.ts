import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  findOneById(id: number) {
    return this.userRepo.find({ where: { id: id } });
  }

  findOneByUsername(username: string) {
    return this.userRepo.find({ where: { username: username } });
  }

  deleteById(id: number) {
    return this.userRepo.delete(id);
  }
}
