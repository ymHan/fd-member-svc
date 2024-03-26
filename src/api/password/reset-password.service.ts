import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity, ResetPasswordEntity } from '@entities/index';
import { ResetPasswordRequest, ResetPasswordResponse } from '@/proto';
import { JwtService } from '@/common/service';

@Injectable()
export class ResetPasswordService {
  @InjectRepository(ResetPasswordEntity)
  private readonly resetPasswordRepository: Repository<ResetPasswordEntity>;
  @InjectRepository(UserAccountEntity)
  private readonly userRepository: Repository<UserAccountEntity>;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const user: UserAccountEntity = await this.userRepository.findOne({ where: { email: data.email } });
    user.password = this.jwtService.encodePassword(data.password);
    await this.userRepository.save(user);
    await this.resetPasswordRepository.delete({ email: data.email });

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'Password updated',
      data: [],
    };
  }
}
