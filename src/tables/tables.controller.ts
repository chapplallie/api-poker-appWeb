import { Controller, Get, Param } from '@nestjs/common';
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
}
