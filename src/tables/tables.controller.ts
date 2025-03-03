import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TableActionResponse } from './interfaces/tables.interface';

@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    @Get()
    getTables(): any {
        return this.tablesService.getTables();
    }

    @Get(':id')
    getTableById(@Param('id') id: string): any {
        return this.tablesService.getTableById(id);
    }

    @Post(':id')
    joinOrLeaveTable(@Param('id') id: string, @Body() body: { action: string, playerId?: number }): TableActionResponse {
        if (!body.playerId) {
            throw new BadRequestException('playerId is required');
        }
        if (body.action === 'join') {
            return this.tablesService.joinTable(id, body.playerId);
        } else if (body.action === 'leave') {
            return this.tablesService.leaveTable(id, body.playerId);
        }
        throw new BadRequestException('Invalid action. Must be "join" or "leave"');
    }

    @Post(':id/start')
    startGame(@Param('id') id: string): TableActionResponse {
        return this.tablesService.startGame(id);
    }
}
