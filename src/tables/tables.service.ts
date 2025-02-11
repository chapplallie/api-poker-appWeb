import { Injectable } from '@nestjs/common';

@Injectable()
export class TablesService {
    tables: any[] = [{
        id: 1,
        status: "Ongoing",
        round: 1,
        turn: 1,
        currentBlind: 50,
        river: [],
        players: []
    },
    {
        id: 2,
        status: "Ongoing", 
        round: 1,
        turn: 1,
        currentBlind: 50,
        river: [],
        players: []
    }];

    getTables(): any {
        return this.tables;
    }

    getTableById(id: string): any {
        return this.tables.find((table: any) => table.id === parseInt(id));
    }

}
