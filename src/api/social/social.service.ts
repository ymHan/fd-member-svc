import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccountEntity, FirebaseUserToken, ChannelAccountEntity, UserProfileAccountEntity } from '@/model/entities';
import { Social } from '@/model/entities';

import { AccountStates } from '@/model/enum';
import { JwtService } from '@/common/service';
import { SocialUserDto } from '@dto/index';
import { SignInResponse } from '@/proto';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(UserAccountEntity)
    private userRepository: Repository<UserAccountEntity>,

    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>,

    @InjectRepository(FirebaseUserToken)
    private readonly firebaseUserRepository: Repository<FirebaseUserToken>,

    @InjectRepository(ChannelAccountEntity)
    private readonly channelRepository: Repository<ChannelAccountEntity>,

    @InjectRepository(UserProfileAccountEntity)
    private readonly profileRepository: Repository<UserProfileAccountEntity>,

    private jwtService: JwtService,
  ) {}

  async socialSignIn(req: SocialUserDto): Promise<SignInResponse> {
    const { name, provider, providerId, pushreceive, emailreceive, usertype } = req;
    const email = req.email.toLowerCase();

    let userEmail = email;
    if (provider === 'apple' && !email) {
      const appleUser = await this.socialRepository.findOne({ where: { provider, providerId } });
      if (!appleUser) {
        return {
          result: 'fail',
          status: HttpStatus.NOT_FOUND,
          message: 'user not found',
          data: [{ error: HttpStatus.NOT_FOUND.toString() }],
        };
      } else {
        userEmail = appleUser.email;
      }
    }

    const user: UserAccountEntity = await this.userRepository.findOne({ where: { email: userEmail } });
    let token: string;

    let userData;
    if (!user) {
      if (!email) {
        return {
          result: 'fail',
          status: HttpStatus.BAD_REQUEST,
          message: 'email is not provided',
          data: [{ error: HttpStatus.BAD_REQUEST.toString() }],
        };
      }

      const newChannel = new ChannelAccountEntity();
      newChannel.channelName = `${name}'s Channel`;
      newChannel.description = `${name}'님의 채널입니다.`;
      newChannel.channelUrl = '';
      newChannel.link = '';
      newChannel.businessEmail = email;

      const channelResult = await this.channelRepository.save(newChannel);

      const newProfile = new UserProfileAccountEntity();
      newProfile.gender = '';
      newProfile.photo = '';
      const profileResult = await this.profileRepository.save(newProfile);

      const newUser = new UserAccountEntity();
      newUser.email = email;
      newUser.password = '';
      newUser.name = name;
      newUser.nickname = name;
      newUser.usertype = usertype;
      newUser.state = AccountStates.ACTIVE;
      newUser.isVerifiedEmail = true;
      newUser.pushreceive = pushreceive;
      newUser.emailreceive = emailreceive;
      newUser.channel = channelResult;
      newUser.profile = profileResult;

      const savedUser = await this.userRepository.save(newUser);

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

    if (req.devicetoken) {
      const checkExists = await this.firebaseUserRepository.findOne({ where: { userId: userData.id } });
      if (checkExists && checkExists.deviceToken !== req.devicetoken) {
        checkExists.deviceToken = req.devicetoken;
        await this.firebaseUserRepository.save(checkExists);
      }
      if (!checkExists) {
        const deviceTokenInfo = new FirebaseUserToken();
        deviceTokenInfo.userId = user.id;
        deviceTokenInfo.deviceToken = req.devicetoken;
        await this.firebaseUserRepository.save(deviceTokenInfo);
      }
    }

    return {
      result: 'ok',
      status: HttpStatus.OK,
      message: 'OK',
      data: [
        {
          ...userData,
          token,
          signType: provider,
        },
      ],
    };
  }
}
