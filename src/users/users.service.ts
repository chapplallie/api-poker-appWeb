import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  users: any[] = [
    {
    name: "pierre",
    coins: 1000,
    id: 1,
    },
    {
      name: "paul",
      coins: 1000,
      id: 2,
      },
      {
        name: "pierre",
        coins: 1000,
        id: 3,
        },
  ]

  getAllUsers(): any {
    return this.users;
  }

  getUserById(id: string): any {
    return this.users.find((user: any) => user.id === parseInt(id));
  }


  create(createUserDto: CreateUserDto) {
  }

  // findOne(id: number) {
  // }

}
