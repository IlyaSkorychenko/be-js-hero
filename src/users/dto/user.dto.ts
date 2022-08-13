import { USER_ROLES } from '../types/user-role.enum';

export class UserDto {
  name: string;
  age: number;
  role: USER_ROLES;
  active: boolean;
}
