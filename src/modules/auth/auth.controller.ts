import { UsersService } from './../users/users.service';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(public readonly authServ: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authServ.signup(createUserDto);
  }

  @Post('/signin')
  signin(@Body() createUserDto: CreateUserDto) {
    return this.authServ.signin(createUserDto);
  }
}
