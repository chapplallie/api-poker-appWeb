import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @Get()
  getUsers(): string {
      return this.usersService.getAllUsers();
  }

  
  @Get(':id')
  getUserById(@Param('id') id: string): string {
    return this.usersService.getUserById(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    
    return this.usersService.create(body);
  }

  // @Patch(':id')
  // updateCoins(
  //   @Param('id') id: number,
  //   @Body() UpdateUserDto: UpdateUserDto) {
  //   return this.usersService.updateCoins(id, UpdateUserDto.coins);
  // }

  @Post('')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted:true, groups: ["login"]}))
  signIn(@Body() body: CreateUserDto) {
    return body;
}

}


