import { nanoid } from 'nanoid';
import { Room } from 'src/modules/rooms/entities/room.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 8 })
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Room, (room) => room.players, { onDelete: 'SET NULL' })
  room: Room;

  @BeforeInsert()
  generateId() {
    this.id = nanoid(8); // Generates a 8-character unique ID
  }
}
