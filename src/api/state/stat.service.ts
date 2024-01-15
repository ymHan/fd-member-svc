import { Injectable } from '@nestjs/common';
import { JwtService } from '@/common/service';

@Injectable()
export class StatService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async updateStat({ email, token, state }): Promise<object> {

  }

}
