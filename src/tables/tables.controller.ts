import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    @Get()
    getTables(): string {
        return this.tablesService.getTables();
    }

    @Get(':id')
    getTableById(@Param('id') id: string): string {
        return this.tablesService.getTableById(id);
    }


    @Post(':id')
    joinOrLeaveTable(@Param('id') id: string, @Body() body: { action: string, playerId?: number }): string {
        if (body.action === 'join') {
            if (!body.playerId) {
                throw new BadRequestException('playerId is required for join action');
            }
            return this.tablesService.joinTable(id, body.playerId);
        } else if (body.action === 'leave') {
            return this.tablesService.leaveTable(id);
        }
        throw new BadRequestException('Invalid action. Must be "join" or "leave"');
    }
}
