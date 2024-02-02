import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MEMBER_SERVICE_NAME, ValidateResponse, ValidateRequest } from '@/proto';
import { ValidateService } from '@/api/validate/validate.service';

@Controller()
export class ValidateController {
  @Inject(ValidateService)
  private readonly service: ValidateService;

  @GrpcMethod(MEMBER_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequest): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }
}
