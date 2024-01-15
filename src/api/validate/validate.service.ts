import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@entities/index';
import { ValidateRequestDto } from '@/model/dtos';
import { JwtService } from '@/common/service';
import { ValidateResponse } from '@/proto';

@Injectable()
export class ValidateService {
  @InjectRepository(User)
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: any = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        error: [HttpStatus.UNAUTHORIZED.toString()],
        userId: null,
      };
    }

    const user: User = await this.jwtService.validateUser(decoded);

    if (!user) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'User not found',
        error: [HttpStatus.CONFLICT.toString()],
        userId: null,
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'OK',
      error: null,
      userId: user.id,
    };
  }
}
