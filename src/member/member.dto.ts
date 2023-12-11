import { IsEmail, IsNumber, IsString, MinLength} from 'class-validator';
import { SignInRequest, SignUpRequest, ValidateRequest } from './member.pb';

export class SignInRequestDto implements SignInRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class SignUpRequestDto implements SignUpRequest {
  @IsString()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsNumber()
  public readonly rolesId: number;
}

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}
