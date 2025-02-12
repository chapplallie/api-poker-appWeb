import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pseudo: string;

    @Column()
    coins: number;


    @Column()
    password: string;

    
    @Column() //{unique:true}
    
    email: string;

}