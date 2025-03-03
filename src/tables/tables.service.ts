import { Injectable } from '@nestjs/common';
import { Table, TableJoinResponse, TableActionResponse } from './interfaces/tables.interface';
import { Player } from '../players/entities/players.entities';

@Injectable()
export class TablesService {
    tables: Table[] = [{
        id: 1,
        name: "Beginner Table",
        status: "Waiting",
        round: 1,
        turn: 1,
        currentBlind: 25,
        smallBlind: 10,
        bigBlind: 25,
        currentBet: 0,
        pot: 0,
        dealerPosition: 0,
        river: [],
        players: [],
        maxPlayers: 6,
        minPlayers: 2
    },
    {
        id: 2,
        name: "Intermediate Table",
        status: "Ongoing", 
        round: 1,
        turn: 1,
        currentBlind: 50,
        smallBlind: 25,
        bigBlind: 50,
        currentBet: 0,
        pot: 0,
        dealerPosition: 0,
        river: [],
        players: [],
        maxPlayers: 8,
        minPlayers: 2
    },
    {
        id: 3,
        name: "Advanced Table",
        status: "Ongoing", 
        round: 1,
        turn: 1,
        currentBlind: 100,
        smallBlind: 50,
        bigBlind: 100,
        currentBet: 0,
        pot: 0,
        dealerPosition: 0,
        river: [],
        players: [],
        maxPlayers: 10,
        minPlayers: 2
    }];

    getTables(): any {
        return this.tables;
    }

    getTableById(id: string): any {
        return this.tables.find((table: any) => table.id === parseInt(id));
    }

    joinTable(id: string, playerId: number): any {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        if (!table) {
            return null;
        }
        table.players.push({
            id: playerId,
            name: "Player " + playerId,
            chips: 1000,
            hand: [],
            position: 0,
            hasFolded: false,
            hasPlayed: false,
            isAllIn: false,
            currentBet: 0,
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            isActive: true,
            isAI: false,
            isCurrentPlayer: false,
            isHuman: true
        });
        return table;
    }

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
