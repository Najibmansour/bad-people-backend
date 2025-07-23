import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const crypted_password = bcrypt.hash(createUserDto.password, 10);

    const user: CreateUserDto = {
      ...createUserDto,
      password: crypted_password,
    };
    return this.userRepo.create(user);
  }

  async findOneById(id: number) {
    const test = await this.userRepo.findOne({ where: { id } });
    console.log(test);

    return test;
  }

  findOneByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }

  deleteById(id: number) {
    return this.userRepo.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
