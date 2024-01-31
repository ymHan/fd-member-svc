import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@/common/service';
import { EmailService } from '@/utils/email/email.service';
import { User } from '@entities/index';
import { SignUpRequestDto } from '@dto/index';
import { SignUpResponse } from '@/proto';
import * as dayjs from 'dayjs';

@Injectable()
export class SignUpService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  public async signup(userData: SignUpRequestDto): Promise<SignUpResponse> {
    const user: User = await this.userRepository.findOne({ where: { email: userData.email } });

    // 이미 이메일 주소가 존재한다면...
    if (user) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'Email already exists',
        data: [],
      };
    }

    const newUser = new User();
    newUser.name = userData.name;
    newUser.nickname = userData.nickname;
    newUser.email = userData.email;
    newUser.password = this.jwtService.encodePassword(userData.password);
    newUser.pushreceive = userData.pushreceive;
    newUser.usertype = userData.usertype;

    const result = await this.userRepository.save(newUser);
    const token = this.jwtService.generateToken(newUser);

    this.emailService.sendVerificationEmail(result.email, token);

    return {
      result: 'ok',
      status: HttpStatus.CREATED,
      message: 'ok',
      data: [
        {
          id: result.id,
          name: result.name,
          nickname: result.nickname,
          email: result.email,
          usertype: result.usertype,
          state: result.state,
          isVerifiedEmail: result.isVerifiedEmail,
          pushreceive: result.pushreceive,
          createdAt: dayjs(result.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS'),
        },
      ],
    };
  }
}
