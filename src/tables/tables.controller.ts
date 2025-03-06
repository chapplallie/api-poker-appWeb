import { Controller, Get, Param, Post, Body, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TableActionResponseDto } from './dto/tables.dto';
import { Public } from '../auth/decorators/public';
import { UsersService } from '../users/users.service'; 
import { User } from 'src/users/entities/user.entity';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('tables')
export class TablesController {
    
    constructor(
        private readonly tablesService: TablesService,
        private readonly UsersService : UsersService
    ) {}

    @Public()
    @Get()
    getTables(): any {
        return this.tablesService.getTables();
    }

    @Public()
    @Get(':id')
    getTableById(@Param('id') id: string): any {
        return this.tablesService.getTableById(id);
    }

    @UseGuards()
    @Post(':id')
    async joinOrLeaveTable(

        @GetUser() user: User,
        @Param('id') id: string,
        @Body() body: { action: string }

    ): Promise<TableActionResponseDto>{
        let userCurrent = await this.UsersService.getUserById(user.id);

        console.log("userCurrent : ", userCurrent);

        if (!userCurrent) {
            throw new BadRequestException('le user est undefined');
        }
        
        if (body.action === 'join') {
            return this.tablesService.joinTable(id, userCurrent);
        } else if (body.action === 'leave') {
            return this.tablesService.leaveTable(id, userCurrent);
        }
         throw new BadRequestException('Invalid action. Must be "join" or "leave"');
    }
    
    @UseGuards()
    @Post(':id/start')
    startGame(
        @GetUser()user: User,
        @Param('id') id: string,
    
    ): TableActionResponseDto {

        console.log(user);
        if (!user) {
            throw new BadRequestException('user is undefined');
        }
        return this.tablesService.startGame(id, user);
    }

    @UseGuards()
    @Post(':id/action')
    performAction(
        @Param('id') id: string,
        @GetUser() user: User,
        @Body() body: {action: string, amount?: number }
    ): TableActionResponseDto {
        if (!user) {
            throw new BadRequestException('playerId is required');
        }
        if (!body.action) {
            throw new BadRequestException('Action is required');
        }
        return this.tablesService.performAction(id, user, body.action, body.amount);
    }
}
