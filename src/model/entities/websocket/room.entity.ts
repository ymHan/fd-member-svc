import { UserAccountEntity } from '@/model/entities';
import { MessageWebsocketEntity } from './message.websocket.entity';
import { JoinedRoomWebsocketEntity } from './joined-room.websocket.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RoomWebsocketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => UserAccountEntity)
  @JoinTable()
  users: UserAccountEntity[];

  @OneToMany(() => JoinedRoomWebsocketEntity, (joinedRoom) => joinedRoom.room)
  joinedUsers: JoinedRoomWebsocketEntity[];

  @OneToMany(() => MessageWebsocketEntity, (message) => message.room)
  messages: MessageWebsocketEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
