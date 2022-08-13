import { USER_ROLES } from '../types/user-role.enum';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsNotEmpty()
  age: number;

  @IsEnum(USER_ROLES)
  @IsNotEmpty()
  role: USER_ROLES;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
