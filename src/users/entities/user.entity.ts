import { Min, min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pseudo: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 1000 }) 
    @Min(0)
    bank: number;

    @Column({ default: 0 })
    @Min(0) 
    victoryStats: number;

      
//pour ajouter victory table => suppr db.sqlite + npm install @nestjs/typeorm typeorm sqlite3
    // @Column()
    // @Min(0)
    // victoryStats: number;

}