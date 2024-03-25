import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/model/entities';
import { Social } from '@/model/entities';

import { SignUpService } from '../signup/signup.service';
import { AccountRoles, AccountStates } from '../../model/enum';
import { JwtService } from '@/common/service';
import { SocialUserDto } from '@dto/index';
import { SignInResponse } from '@/proto';

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

  async socialSignIn(req: SocialUserDto): Promise<SignInResponse> {
    const { email, name, provider, providerId, pushreceive, emailreceive, usertype } = req;
    
    const user: User = await this.userRepository.findOne({ where: { email } });

    let token: string;
    if (!user) {
      const newUser = new User();
      newUser.email = email;
      newUser.password = '';
      newUser.name = name;
      // newUser.usertype = AccountRoles.USER;
      newUser.usertype = usertype;
      newUser.state = AccountStates.ACTIVE;
      newUser.isVerifiedEmail = false;
      newUser.pushreceive = pushreceive;
      newUser.emailreceive = emailreceive;

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

    const savedUser: User = await this.userRepository.findOne({ where: { email } });

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          id: savedUser.id,
          email: savedUser.email,
          name: savedUser.name,
          nickname: savedUser.nickname,
          pushreceive: savedUser.pushreceive,
          emailreceive: savedUser.emailreceive,
          token,
        },
      ],
    };
  }
}
