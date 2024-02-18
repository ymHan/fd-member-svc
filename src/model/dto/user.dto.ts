import { IsEmail, IsString, MinLength, IsEnum, IsEmpty, IsNumber } from 'class-validator';
import { SignInRequest, SignUpRequest, ValidateRequest } from '@/proto/';
import { AccountRoles } from '../enum';
export class SignInResponseDto {
  @IsNumber()
  public readonly id: number;

  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly nickname: string;
}

export class SignUpRequestDto implements SignUpRequest {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly nickname: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsEmpty()
  public readonly pushreceive: boolean;

  @IsEmpty()
  public readonly emailreceive: boolean;

  @IsEnum(AccountRoles)
  @IsEmpty()
  public readonly usertype: AccountRoles;
}
export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}
