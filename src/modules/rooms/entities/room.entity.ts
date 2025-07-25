import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GameStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

export enum RoundTime {
  TEN_SECONDS = 10,
  TWENTY_SECONDS = 20,
  THIRTY_SECONDS = 30,
}

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_user_id' })
  hostUser: User;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.WAITING,
  })
  status: GameStatus;

  @Column({ default: 0 })
  currentRoundNumber: number;

  @Column({ type: 'int', default: 8 })
  maxPlayers: number;

  @Column({ type: 'int', default: 10 })
  maxRounds: number;

  @Column({
    type: 'enum',
    enum: RoundTime,
    default: RoundTime.TWENTY_SECONDS,
  })
  roundTime: RoundTime;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
