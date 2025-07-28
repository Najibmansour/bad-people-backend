import { nanoid } from 'nanoid';
import { User } from 'src/modules/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
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
  @PrimaryColumn({ type: 'varchar', length: 8 })
  id: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
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

  @OneToMany(() => User, (user) => user.room, { cascade: true })
  players: User[];

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

  @BeforeInsert()
  generateId() {
    this.id = nanoid(8); // Generates a 8-character unique ID
    this.code = nanoid(8);
  }
}
