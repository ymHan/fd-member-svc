import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '@/utils/email/email.service';
import { UserAccountEntity, ResetPasswordEntity } from '@entities/index';

import { FindEmailRequest, FindEmailResponse } from '@/proto';

@Injectable()
export class FindEmailService {
  @InjectRepository(UserAccountEntity)
  private readonly userRepository: Repository<UserAccountEntity>;
  @InjectRepository(ResetPasswordEntity)
  private readonly resetPasswordRepository: Repository<ResetPasswordEntity>;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  public async findEmail(userData: FindEmailRequest): Promise<FindEmailResponse> {
    const user: UserAccountEntity = await this.userRepository.findOne({ where: { email: userData.email } });
    if (!user) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'No signup information exists. Please check your email address.',
        data: [],
      };
    }
    const authEmail = await this.resetPasswordRepository.findOne({ where: { email: userData.email } });
    if (authEmail) {
      await this.resetPasswordRepository.delete({ email: userData.email });
    }
    const authCode = Math.floor(100000 + Math.random() * 900000);
    const resetPasswordEntity = new ResetPasswordEntity();
    resetPasswordEntity.email = userData.email;
    resetPasswordEntity.code = authCode.toString();
    await this.resetPasswordRepository.save(resetPasswordEntity);

    this.emailService.sendFindEmail(user.email, authCode.toString());

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'The verification code has been issued. Please check your email.',
      data: [],
    };
  }
}
