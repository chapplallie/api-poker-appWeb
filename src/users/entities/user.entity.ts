import { Min, min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pseudo: string;

    @Column()
    bank: number;


    @Column()
    password: string;

    
    @Column() //{unique:true}
    
    email: string;

      
//pour ajouter victory table => suppr db.sqlite + npm install @nestjs/typeorm typeorm sqlite3
    @Column()
    @Min(0)
    victoryStats: number;

}