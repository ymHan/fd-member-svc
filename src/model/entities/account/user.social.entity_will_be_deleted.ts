import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SocialProvider } from '@enum/index';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmail()
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: SocialProvider })
  provider!: SocialProvider;

  @Column({ type: 'varchar', nullable: false })
  providerId!: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;
}
