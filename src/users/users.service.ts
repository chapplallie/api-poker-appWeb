import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  users: any[] = [
    {
      pseudo: "pierre",
      coins: 1000,
      id: 1,
      email: "loliolol@dkjskfj.fr",
      password: "string"
    },
    {
      pseudo: "paul",
      coins: 1000,
      id: 2,
       email: "ltest@testj.fr",
      password: "lolilol147"
    },
    {
      pseudo: "jacques",
      coins: 1000,
      id: 3,
      email: "loliolccaeeiol@dkjskfj.fr",
      password: "test"
    },
  ]

  getAllUsers(): any {
    return this.users;
  }

  getUserById(id: string): any {
    return this.users.find((user: any) => user.id === parseInt(id));
  }

  create(createUserDto: CreateUserDto) {
    //auto implementation de l'id ???
    //uuid? Date.start/Date.now/ Date.quelquechose?? => voir doc surement lol
    const newUser = createUserDto;
    this.users.push(newUser);
    return newUser;
  }

  updateCoins(userId: number, coins: number) {
    
  }
}

