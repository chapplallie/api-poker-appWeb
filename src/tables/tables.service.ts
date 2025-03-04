import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TableDto, TableJoinResponseDto, TableActionResponseDto } from './dto/tables.dto';
import { Player } from '../players/entities/players.entities';
import { GameLogicService } from '../game-logic/game-logic.service';

@Injectable()
export class TablesService {
    tables: TableDto[] = [{
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

    constructor(
        @Inject(forwardRef(() => GameLogicService))
        private readonly gameLogicService: GameLogicService
    ) {}

    getTables(): any {
        return this.tables;
    }

    getTableById(id: string): any {
        return this.tables.find((table: any) => table.id === parseInt(id));
    }

    joinTable(id: string, playerId: number): TableJoinResponseDto {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        
        if (!table) {
            return {
                success: false,
                error: 'Table not found'
            };
        }
        
        if (table.players.some(player => player.id === playerId)) {
            return {
                success: false,
                error: 'Player already joined this table'
            };
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
        
        return {
            success: true,
            table
        };
    }

    leaveTable(id: string, playerId: number): TableActionResponseDto     {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        
        if (!table) {
            return {
                success: false,
                error: 'Table not found'
            };
        }
        
        const playerExists = table.players.some(player => player.id === playerId);
        if (!playerExists) {
            return {
                success: false,
                error: 'Player not found at this table'
            };
        }
        
        // Logique pour sécuriser les gains dans users
        
        table.players = table.players.filter((player: any) => player.id !== playerId);
        
        return {
            success: true,
            table
        };
    }

    startGame(id: string): TableActionResponseDto {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        
        if (!table) {
            return {
                success: false,
                error: 'Table not found'
            };
        }
        
        if (table.players.length < table.minPlayers) {
            return {
                success: false,
                error: `Not enough players. Minimum ${table.minPlayers} required.`
            };
        }
        
        if (table.status === 'Ongoing') {
            return {
                success: false,
                error: 'Game is already in progress'
            };
        }
        
        table.status = 'Ongoing';
        
        const gameState = this.gameLogicService.initializeGame(table);
        
        return {
            success: true,
            table: gameState.table
        };
    }

}
