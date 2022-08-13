import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public all(filter: GetUserFilterDto): Promise<User[]> {
    const { name, search } = filter;
    const query = this.userRepository.createQueryBuilder('users');

    if (name) {
      query.andWhere('users.name = :name', { name });
    }

    if (search) {
      query.andWhere('LOWER(users.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    return query.getMany();
  }

  public getById(id: string) {
    return this.userRepository.findOneByOrFail({
      id,
    });
  }

  public deleteById(id: string) {
    return this.userRepository.delete({ id });
  }

  public async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    return user;
  }

  public updateById(user: UserDto) {
    return this.userRepository.save(user);
  }
}
