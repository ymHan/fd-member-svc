import { Repository } from 'typeorm';
import { CustomRepository } from '@config/typeorm/typeorm-ex.decorator';
import { User } from '@entities/index';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
