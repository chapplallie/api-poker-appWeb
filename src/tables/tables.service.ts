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

    // TODO: Add logic to leave table & secure winnings
    leaveTable(id: string, playerId: number): any {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        if (table) {
            table.players = table.players.filter((player: any) => player.id !== playerId);
        }
        return table;
    }

    startGame(id: string): any {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        if (table) {
            table.status = "Ongoing";
        }
        return table;
    }

}
