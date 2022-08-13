import { USER_ROLES } from '../types/user-role.enum';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(3, 255)
  name?: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  age?: number;

  @IsEnum(USER_ROLES)
  role?: USER_ROLES;

  @IsBoolean()
  active?: boolean;
}
