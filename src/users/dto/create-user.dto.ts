
export class CreateUserDto {
    //gerer la singularité des infos : pas deux users avec le meme mail/nom
    id: number;
    pseudo: string;
    coins: number;
    email: string;
    password: string;

}
