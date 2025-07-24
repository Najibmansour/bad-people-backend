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

  async signin(user: SignInDto) {
    // if (!user || !user.email || !user.password || !user.username) {
    //   throw new BadRequestException(
    //     'Email, Username and password are required',
    //   );
    // }

    this.validateUser(user);
    const payload = { username: user.email };
    return {
      access_token: this.jwtServ.sign(payload),
    };
  }

  async signup(userinfo: SignUpDto) {
    // if (
    //   !userinfo ||
    //   !userinfo.email ||
    //   !userinfo.password ||
    //   !userinfo.username
    // ) {
    //   throw new BadRequestException(
    //     'Email, Username and password are required',
    //   );
    // }

    const email_used = await this.userServ.findByEmail(userinfo.email);

    if (email_used) {
      throw new BadRequestException('Email already used');
    }

    const username_used = await this.userServ.findByEmail(userinfo.email);

    if (username_used) {
      throw new BadRequestException('User is taken');
    }

    const user = await this.userServ.create(userinfo);

    const payload = { username: user.email };
    return {
      access_token: this.jwtServ.sign(payload),
    };
  }
}
