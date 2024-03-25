import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/model/entities';
import { Social } from '@/model/entities';

import { SignUpService } from '../signup/signup.service';
import { AccountRoles, AccountStates } from '../../model/enum';
import { JwtService } from '@/common/service';
import { SocialUserDto } from '@dto/index';
import { SocialResponse } from '@/proto';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>,

    private jwtService: JwtService,
    private signupService: SignUpService,
  ) {}

  async socialLogin(req: SocialUserDto): Promise<SocialResponse> {
    const { email, name, provider, providerId } = req;
    const user: User = await this.userRepository.findOne({ where: { email } });

    let token: string;
    if (!user) {
      const newUser = new User();
      newUser.email = email;
      newUser.password = '';
      newUser.name = name;
      newUser.usertype = AccountRoles.USER;
      newUser.state = AccountStates.ACTIVE;
      newUser.isVerifiedEmail = true;

      const signupData = await this.signupService.signup(newUser);
      if (signupData.status === HttpStatus.OK) {
        token = this.jwtService.generateToken(newUser);
      }

      const newSocial = new Social();
      newSocial.email = email;
      newSocial.provider = provider;
      newSocial.providerId = providerId;

      const checkExists = await this.socialRepository.findOne({ where: { email, provider } });
      if (!checkExists) {
        await this.socialRepository.save(newSocial);
      }
    } else {
      token = this.jwtService.generateToken(user);
    }

    return {
      status: HttpStatus.OK,
      message: 'OK',
      token,
      error: null,
    };
  }
}
