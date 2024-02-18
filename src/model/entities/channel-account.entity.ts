import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from 'typeorm';

@Entity({ name: 'channel_account' })
export class ChannelAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // 채널 아이디

  @Column({ type: 'varchar', length: 255, comment: '채널 이름' })
  channelName: string; // 채널 이름

  @Column({ type: 'text', nullable: true, comment: '채널 설명' })
  description: string;

  @Column({ type: 'varchar', length: 255, comment: '채널 URL' })
  channelUrl: string; // 채널 URL

  @Column({ type: 'varchar', length: 255, comment: '채널 외부 링크' })
  link: string; // 외부 링크

  @Column({ type: 'varchar', length: 255, comment: '채널 비즈니스 email' })
  businessEmail: string; // 비즈니스 이메일

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', comment: '생성일' })
  createdAt: Date;
}
