import { UsersService } from './../users/users.service';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(public readonly authServ: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: SignUpDto) {
    return this.authServ.signup(createUserDto);
  }

  @Post('/signin')
  signin(@Body() createUserDto: SignInDto) {
    return this.authServ.signin(createUserDto);
  }
}
