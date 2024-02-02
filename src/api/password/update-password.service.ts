import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/index';
import { UpdatePasswordRequest, UpdatePasswordResponse } from '@/proto';
import { JwtService } from '@/common/service';

@Injectable()
export class UpdatePasswordService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async updatePassword(data: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    const decoded: User = await this.jwtService.verify(data.token);

    if (!decoded) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
        data: [],
      };
    }
    const user: User = await this.userRepository.findOne({ where: { email: decoded.email } });

    user.password = this.jwtService.encodePassword(data.password);

    await this.userRepository.save(user);

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'Password updated',
      data: [],
    };
  }
}
