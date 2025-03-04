import { Injectable } from '@nestjs/common';
import { Player } from './entities/players.entities';
import { TableDto } from 'src/tables/dto/tables.dto';

@Injectable()
export class PlayersService {
    placeBet(player: Player, bet: number): any {
        // Vérifie si le joueur a assez d'argent
        if(bet > player.chips){
            this.fold(player);
            return "vous etes trop pauvre pour parier";

        } 
        player.chips -= bet;
        return player.chips;
    }

    fold(player: Player): void {
        // Met le statut hasFolded du joueur à true
        player.hasFolded = true;
    }

    check(player: Player, table: TableDto): void {
        // Vérifie si le check est possible
        if(player.currentBet !== table.currentBet){
            throw new Error("votre mise n'est pas egale a la mise la plus haute de la table")
        }
        // Enregistre l'action
        
    }

    call(player: Player, amount: number): void {
        // Vérifie si le call est possible
        // Appelle placeBet avec le montant nécessaire
        this.placeBet(player, amount);
    }

    raise(player: Player, amount: number): void {
        // Vérifie si le raise est possible
        // Appelle placeBet avec le nouveau montant
        this.placeBet(player, amount);
    }

    showCards(player: Player): any {
        // Retourne les cartes du joueur
        return player.hand;
    }
}