import { IsEmail, IsString, IsEnum } from 'class-validator';
import { SocialRequest } from '../../proto/member.pb';

import { SocialProvider } from '../enum';

export class SocialUserDto implements SocialRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  @IsEnum(SocialProvider)
  public readonly provider: SocialProvider;

  @IsString()
  public readonly providerId: string;
}
