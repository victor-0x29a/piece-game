import { CreatePieceDto } from "./piece.dto";

export interface sorteds {
    Periféricos: CreatePieceDto;
    'Placa de vídeo': CreatePieceDto;
    Processadores: CreatePieceDto;
    Refrigeração: CreatePieceDto;
    Acessórios: CreatePieceDto;
    Tela: CreatePieceDto;
    Ambiente: CreatePieceDto;
}

export interface GameDto {
    id: number;
    title: string
    description: string
    sorted: object
    day: string
}
