import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AccountRoles, AccountStates } from '../enum';
import { Profile, ChannelAccount, Subscription } from './index';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmail()
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  name!: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  nickname!: string;

  @Column({ type: 'enum', enum: AccountRoles })
  usertype!: AccountRoles;

  @Column({ type: 'boolean', default: true })
  pushreceive: boolean;

  @Column({ type: 'boolean', default: true })
  emailreceive: boolean;

  @Column({ type: 'enum', name: 'state', enum: AccountStates, default: AccountStates.ACTIVE })
  'state': AccountStates;

  @Column({ type: 'boolean', default: true })
  isVerifiedEmail: boolean;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;
}
