import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum GameStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}

export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string; // 6-digit or alphanumeric room code

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

  @CreateDateColumn()
  createdAt: Date;

  // @OneToMany(() => Player, (player) => player.game)
  // players: Player[];

  // @OneToMany(() => GameRound, (round) => round.game)
  // rounds: GameRound[];
}
