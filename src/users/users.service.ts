import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo : Repository<User>){}
  
  async getAllUsers(): Promise<User[]> {
    return await this.repo.find();
  }

  async getUserById(id: number): Promise<User | null> {
    const user =  await this.repo.findOne({ where: { id: id }});
    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const verifyUserEmail = await this.repo.findOne({where: {email: userData.email}});

    if (verifyUserEmail) {
        throw new Error("email déjà utilisé.");
    }

    if(userData.password){
      const saltOrRounds = 10;
      const password = userData.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      userData.password = hash;
      const newUser = userData;
      let user = this.repo.create(newUser);
      return this.repo.save(userData);
    }
    else{
      throw new Error("mot de passe requis.");
    }
  }

  async findOne(pseudo: string): Promise<User | null> {

    return this.repo.findOneBy({"pseudo": pseudo});
  }

}