import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { GameStatus } from '../entities/room.entity';

export class UpdateRoomDto {
  @IsOptional()
  @IsEnum(GameStatus)
  status?: GameStatus;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(99)
  maxRounds?: number;

  @IsOptional()
  @IsInt()
  @Min(2)
  maxPlayers?: number;

  @IsOptional()
  @IsInt()
  currentRoundNumber?: number;
}
