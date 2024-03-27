import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/model/entities';
import { Social } from '@/model/entities';

import { AccountStates } from '../../model/enum';
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
      newUser.nickname = name;
      newUser.usertype = usertype;
      newUser.state = AccountStates.ACTIVE;
      newUser.isVerifiedEmail = true;
      newUser.pushreceive = pushreceive;
      newUser.emailreceive = emailreceive;
      await this.userRepository.save(newUser);

      const newSocial = new Social();
      newSocial.email = email;
      newSocial.provider = provider;
      newSocial.providerId = providerId;

      const checkExists = await this.socialRepository.findOne({ where: { email, provider } });
      if (!checkExists) {
        await this.socialRepository.save(newSocial);
      }
      token = this.jwtService.generateToken(newUser);
    } else {
      token = this.jwtService.generateToken(user);
    }

    const savedUser: User = await this.userRepository.findOne({ where: { email } });
    savedUser.nickname = `4D${savedUser.id}`;
    await this.userRepository.save(savedUser);

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
