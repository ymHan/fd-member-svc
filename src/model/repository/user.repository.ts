import { Repository } from 'typeorm';
import { CustomRepository } from '@config/typeorm/typeorm-ex.decorator';
import { UserAccountEntity } from '@entities/index';

@CustomRepository(UserAccountEntity)
export class UserRepository extends Repository<UserAccountEntity> {}
