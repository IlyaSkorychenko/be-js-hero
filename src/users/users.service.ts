import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  public getAllUsers(filter: GetUserFilterDto): Promise<User[]> {
    return this.userRepository.all(filter);
  }

  public getUserById(id: string) {
    return this.userRepository.getById(id);
  }

  public async deleteUserById(id: string): Promise<void> {
    await this.userRepository.getById(id);
    await this.userRepository.deleteById(id);
    return;
  }

  public createUser(userData: CreateUserDto): Promise<User> {
    return this.userRepository.create(userData);
  }

  public async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.getById(id);
    console.log({ ...user, ...userData });
    console.log({ userData });
    return this.userRepository.updateById({ ...user, ...userData } as UserDto);
  }
}
