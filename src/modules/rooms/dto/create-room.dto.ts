import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { RoundTime } from '../entities/room.entity';

export class CreateRoomDto {
  @IsInt()
  @Min(2)
  @Max(8)
  maxPlayers: number;

  @IsInt()
  @Min(10)
  @Max(99)
  maxRounds: number;

  @IsEnum(RoundTime)
  roundTime: number;

  @IsOptional()
  @IsString()
  name: string;
}
