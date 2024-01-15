import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ValidateRequestDto } from '@dto/index';
import { MEMBER_SERVICE_NAME, ValidateResponse } from '@/proto';
import { ValidateService } from '@/api/validate/validate.service';

@Controller()
export class ValidateController {
  @Inject(ValidateService)
  private readonly service: ValidateService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }
}
