import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { GetUserFilterDto } from './dto/get-user-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public getAll(@Query() filter: GetUserFilterDto): Promise<User[]> {
    return this.userService.getAllUsers(filter);
  }

  @Get(':id')
  public getById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  public delete(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Post()
  public create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    console.log({ body });
    return this.userService.updateUser(id, body);
  }
}
