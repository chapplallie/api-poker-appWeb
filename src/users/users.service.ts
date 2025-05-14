import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

async create(userData: CreateUserDto): Promise<User> {
  const verifyUserEmail = await this.repo.findOne({ where: { email: userData.email } });
  if (verifyUserEmail) {
    throw new Error("email déjà utilisé.");
  }
  if (!userData.password) {
    throw new Error("mot de passe requis.");
  }

  const saltOrRounds = 10;
  const hash = await bcrypt.hash(userData.password, saltOrRounds);

  const newUser = this.repo.create({
    ...userData,
    password: hash,
  });
  console.log("newUser", newUser);
  return this.repo.save(newUser);
}

  async findOne(pseudo: string): Promise<User | null> {

    return this.repo.findOneBy({"pseudo": pseudo});
  }

}