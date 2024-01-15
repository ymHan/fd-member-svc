import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@/common/service';
import { User } from '@entities/index';
import { SignUpRequestDto } from '@dto/index';
import { SignUpResponse } from '@/proto';

@Injectable()
export class SignUpService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async signup(userData: SignUpRequestDto): Promise<SignUpResponse> {
    const user: User = await this.userRepository.findOne({ where: { email: userData.email } });

    // 이미 이메일 주소가 존재한다면...
    if (user) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Email already exists',
        error: [HttpStatus.CONFLICT.toString()],
      };
    }

    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.password = this.jwtService.encodePassword(userData.password);
    newUser.role = userData.role;

    await this.userRepository.save(newUser);
    const token: string = this.jwtService.generateToken(newUser);
    console.log(token);

    return {
      status: HttpStatus.CREATED,
      message: 'OK',
      error: null,
    };
  }
}
