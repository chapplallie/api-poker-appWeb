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

    joinTable(id: string, playerId: number): any {
        this.tables.find((table: any) => table.id === parseInt(id)).players.push({
            id: playerId,
            name: "Player " + playerId,
            chips: 1000
        });
        return this.tables.find((table: any) => table.id === parseInt(id));
    }

    leaveTable(id: string): any {
        this.tables.find((table: any) => table.id === parseInt(id)).players = this.tables.find((table: any) => table.id === parseInt(id)).players.filter((player: any) => player.id !== 1);
        return this.tables.find((table: any) => table.id === parseInt(id));
    }

}
