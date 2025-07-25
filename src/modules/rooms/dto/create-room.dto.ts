import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { GameStatus } from '../entities/room.entity';

export enum RoundTime {
  TEN_SECONDS = 10,
  TWENTY_SECONDS = 20,
  THIRTY_SECONDS = 30,
}

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  code: string; // Room code (6-digit or alphanumeric)

  @IsInt()
  @Min(2)
  maxPlayers: number; // Minimum 2 players

  @IsInt()
  @Min(10)
  @Max(99)
  maxRounds: number; // Between 10 and 99

  @IsOptional()
  status?: GameStatus = GameStatus.WAITING; // Default: WAITING
}
