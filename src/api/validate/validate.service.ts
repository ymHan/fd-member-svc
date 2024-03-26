import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UserAccountEntity } from '@entities/index';
import { ValidateRequestDto } from 'src/model/dto';
import { JwtService } from '@/common/service';
import { ValidateResponse } from '@/proto';

@Injectable()
export class ValidateService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: UserAccountEntity = await this.jwtService.verify(token);
    if (!decoded) {
      return {
        result: 'fail',
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        data: [{ error: HttpStatus.UNAUTHORIZED.toString() }],
      };
    }

    const user: UserAccountEntity = await this.jwtService.validateUser(decoded);

    if (!user) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'User not found',
        data: [
          {
            error: HttpStatus.CONFLICT.toString(),
          },
        ],
      };
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          id: user.id,
          email: user.email,
        },
      ],
    };
  }
}
