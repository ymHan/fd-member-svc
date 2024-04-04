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

    let userEmail = email;
    if (provider === 'apple' && !email) {
      const appleUser = await this.socialRepository.findOne({ where: { provider, providerId } });
      if (!appleUser) {
        return {
          result: 'fail',
          status: HttpStatus.NOT_FOUND,
          message: 'user not found',
          signType: null,
          data: [{ error: HttpStatus.NOT_FOUND.toString() }],
        };
      } else {
        userEmail = appleUser.email;
      }
    }

    const user: User = await this.userRepository.findOne({ where: { email: userEmail } });
    let token: string;

    let userData;
    if (!user) {
      if (!email) {
        return {
          result: 'fail',
          status: HttpStatus.BAD_REQUEST,
          message: 'email is not provided',
          signType: null,
          data: [{ error: HttpStatus.BAD_REQUEST.toString() }],
        };
      }

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

      const savedUser: User = await this.userRepository.findOne({ where: { email } });
      savedUser.nickname = `4D${savedUser.id}`;
      await this.userRepository.save(savedUser);
      userData = savedUser;

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
      userData = user;
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      signType: provider,
      data: [
        {
          ...userData,
          token,
        },
      ],
    };
  }
}
