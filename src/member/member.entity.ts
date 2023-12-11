import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'int' })
  public rolesId: number;
}
