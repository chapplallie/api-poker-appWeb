import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, NotFoundException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @Get()
  getUsers(): any {
      return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    const userId = req.user.id; // Extract the user ID from the JWT payload
    const user = await this.usersService.getUserById(userId); // Fetch the full user data from UsersService

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Exclude sensitive fields like the password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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


