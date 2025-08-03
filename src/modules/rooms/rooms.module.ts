import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { RoomController } from './rooms.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RoomController],
  imports: [
    TypeOrmModule.forFeature([Room, User]),
    AuthModule,
    JwtModule,
    UsersModule,
  ],
  providers: [RoomsGateway, RoomsService],
})
export class RoomsModule {}
