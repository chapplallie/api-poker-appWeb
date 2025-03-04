import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @Get()
  getUsers(): any {
      return this.usersService.getAllUsers();
  }

  
  @Get(':id')
  //changer le any svp lol
  getUserById(@Param('id') id: string): any {
    return this.usersService.getUserById(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    console.log("create user")
    return this.usersService.create(body);
  }

  // @Patch(':id')
  // updatebank(
  //   @Param('id') id: number,
  //   @Body() UpdateUserDto: UpdateUserDto) {
  //   return this.usersService.updatebank(id, UpdateUserDto.bank);
  // }

//   @Post('login')
//   @UsePipes(new ValidationPipe({ forbidNonWhitelisted:true, groups: ["login"]}))
//   signIn(@Body() body: CreateUserDto) {
//     return body;
// }

}


