import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TableDto, TableJoinResponseDto, TableActionResponseDto } from './dto/tables.dto';
import { GameLogicService } from '../game-logic/game-logic.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TablesService {
    tables: TableDto[] = [{
        id: 1,
        name: "Bernard Tapis d'Eveil",
        status: "En attente",
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
        maxPlayers: 4,
        minPlayers: 2,
        gameLog: []
    },
    {
        id: 2,
        name: "Sous la moquette",
        status: "En attente", 
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
        maxPlayers: 4,
        minPlayers: 2,
        gameLog: []
    },
    {
        id: 3,
        name: "Bernard ULTIMATE Tapis",
        status: "En attente", 
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
        maxPlayers: 4,
        minPlayers: 2,
        gameLog: []
    }];

    constructor(
        @Inject(forwardRef(() => GameLogicService))
        private readonly gameLogicService: GameLogicService,
    ) {}

    getTables(): any {
        return this.tables;
    }

    getTableById(id: string): any {
        return this.tables.find((table: any) => table.id === parseInt(id));
    }

    joinTable(id: string, user: User): TableJoinResponseDto {
        const table = this.tables.find((table: any) => table.id === parseInt(id));

        if (!table) {
            return {
                success: false,
                error: 'Table non trouvée'
            };
        }
        
        if (table.players.some(player => player.id === user.id)) {
            return {
                success: false,
                error: 'Un joueur a déjà rejoint cette table'
            };
        }
        
        table.players.push({
            id: user.id,
            name: user.pseudo || "Joueur " + user.id,
            chips: user.bank,
            hand: [],
            tableId: table.id,
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
            isHuman: true,
            hasAlreadyRaise: false
        });
        
        return {
            success: true,
            table
        };
    }

    leaveTable(id: string, user: User): TableActionResponseDto     {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        
        if (!table) {
            return {
                success: false,
                error: 'Table non trouvée'
            };
        }
        
        const playerExists = table.players.some(player => player.id === user.id);
        if (!playerExists) {
            return {
                success: false,
                error: 'Joueur non trouvé dans la table'
            };
        }
        
        // Logique pour sécuriser les gains dans users
        
        table.players = table.players.filter((player: any) => player.id !== user.id);
        
        return {
            success: true,
            table
        };
    }

    startGame(id: string, user: User): TableActionResponseDto {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        
        if (!table) {
            return {
                success: false,
                error: 'Table non trouvée'
            };
        }
        
        const playerExists = table.players.some(player => player.id === user.id);
        if (!playerExists) {
            return {
                success: false,
                error: 'Un joueur doit être présent pour démarrer la partie'
            };
        }
        
        const aiPlayersToAdd = table.maxPlayers - table.players.length;
        if (aiPlayersToAdd > 0) {
            this.addAIPlayers(table, aiPlayersToAdd);
        }
        
        if (table.status === 'En cours') {
            return {
                success: false,
                error: 'La partie est déjà en cours'
            };
        }
        
        table.status = 'En cours';
        
        const gameState = this.gameLogicService.initializeGame(table);
        
        return {
            success: true,
            // table: gameState.table,
            currentPlayer: gameState.currentPlayer,
            possibleActions: gameState.possibleActions
        };
    }

    private addAIPlayers(table: TableDto, count: number): void {
        const maxPlayerId = Math.max(
            ...table.players.map(player => player.id),
            1000
        );
        
        for (let i = 0; i < count; i++) {
            const aiPlayerId = maxPlayerId + i + 1;
            table.players.push({
                id: aiPlayerId,
                name: `AI Player ${i + 1}`,
                chips: 1000,
                hand: [],
                tableId: table.id,
                position: 0,
                hasFolded: false,
                hasPlayed: false,
                isAllIn: false,
                currentBet: 0,
                isDealer: false,
                isSmallBlind: false,
                isBigBlind: false,
                isActive: true,
                isAI: true,
                isCurrentPlayer: false,
                isHuman: false,
                hasAlreadyRaise: false
            });
        }
    }

    performAction(id: string, user: User, action: string, amount?: number): TableActionResponseDto {
        const table = this.tables.find((table: any) => table.id === parseInt(id));
        
        if (!table) {
            return {
                success: false,
                error: 'Table non trouvée'
            };
        }

        const player = table.players.find((player: any) => player.id === user.id);
        
        if (!player) {
            console.log("user dans performAction", );
            return {
                
                success: false,
                error: 'Joueur non trouvé'
            };
        }
        
        this.gameLogicService.executeAction(player, action, table, amount);
        
        const gameState = this.gameLogicService.evaluateGameState(table);

        if (gameState && gameState.error) {
            return {
                success: false,
                error: gameState.error
            };
        }
        return {
            success: true,
            ...gameState
        };
    }

}
