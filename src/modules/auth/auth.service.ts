import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { getUserFromToken } from 'src/utils/user/getUserRow';

@Injectable()
export class AuthService {
  constructor(
    private userServ: UsersService,
    private jwtServ: JwtService,
  ) {}

  async validateUser(user: SignInDto) {
    const is_valid = await this.userServ.validateUser(
      user.email,
      user.password,
    );
    if (!is_valid) throw new UnauthorizedException('Invalid credentials');
    return is_valid;
  }

  async signin(user_info: SignInDto) {
    const user = await this.validateUser(user_info);
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtServ.sign(payload),
    };
  }

  async signup(userinfo: SignUpDto) {
    const email_used = await this.userServ.findByEmail(userinfo.email);
    // getUserFromToken(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hamliIiwiaWQiOiJfWlZ4dm0yWiIsImlhdCI6MTc1MzU0MDQ5MH0.GUDGeT1sm8LDjRJBhpKZHnOoLjZVcTdcKgGljy6HgX8',
    // );
    if (email_used) {
      throw new BadRequestException('Email already used');
    }

    const username_used = await this.userServ.findByEmail(userinfo.email);

    if (username_used) {
      throw new BadRequestException('User is taken');
    }

    const user = await this.userServ.create(userinfo);

    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtServ.sign(payload),
    };
  }
}
