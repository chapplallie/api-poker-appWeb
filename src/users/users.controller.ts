import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @Get()
  getUsers(): any {
      return this.usersService.getAllUsers();
  }

  
  @Get(':id')
  getUserById(@Param('id') id: number): any {
    return this.usersService.getUserById(id);
  }

  @Post()
  @Public()
  
  create(@Body() body: CreateUserDto) {
    console.log("created user")
    return this.usersService.create(body);
  }

  // @Patch(':id')
  // updatebank(
  //   @Param('id') id: number,
  //   @Body() UpdateUserDto: UpdateUserDto) {
  //   return this.usersService.updatebank(id, UpdateUserDto.bank);
  // }

}


