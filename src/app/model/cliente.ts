import { Endereco } from "./endereco";

export class Cliente {
    id!: number;
    nomeCompleto!: string;
    dataNascimento!: Date;
    cpf!: string;
    genero!: string;
    telefone!: string;
    endereco!: Endereco;
}