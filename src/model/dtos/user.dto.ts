import { IsEmail, IsString, MinLength, IsEnum, IsEmpty } from 'class-validator';
import { SignInRequest, SignUpRequest, ValidateRequest } from '../../proto/member.pb';
import { AccountRoles } from '../enum';

export class SignUpRequestDto implements SignUpRequest {
  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsEnum(AccountRoles)
  @IsEmpty()
  public readonly role: AccountRoles;
}

export class SignInRequestDto implements SignInRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}