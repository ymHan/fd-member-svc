import { IsEmail, IsString, IsEnum, IsEmpty } from 'class-validator';
import { SocialSignInRequest } from '../../proto/member.pb';
import { AccountRoles, SocialProvider } from '../enum';

export class SocialUserDto implements SocialSignInRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  @IsEnum(SocialProvider)
  public readonly provider: SocialProvider;

  @IsString()
  public readonly providerId: string;

  @IsEmpty()
  public readonly pushreceive: boolean;

  @IsEmpty()
  public readonly emailreceive: boolean;

  @IsEnum(AccountRoles)
  @IsEmpty()
  public readonly usertype: AccountRoles;
}
