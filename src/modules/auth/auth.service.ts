import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async validateUser(user: CreateUserDto) {
    const is_valid = await this.userServ.validateUser(
      user.email,
      user.password,
    );
    if (!is_valid) throw new UnauthorizedException('Invalid credentials');
    return is_valid;
  }

  async signin(user: SignInDto) {
    this.validateUser(user);
    const payload = { username: user.email };
    return {
      access_token: this.jwtServ.sign(payload),
    };
  }

  async signup(userinfo: SignUpDto) {
    const user_exists = await this.userServ.findByEmail(userinfo.email);
    if (!user_exists) {
      const user = this.userServ.create(userinfo);

      const payload = { username: user.email };
      return {
        access_token: this.jwtServ.sign(payload),
      };
    }
  }
}
