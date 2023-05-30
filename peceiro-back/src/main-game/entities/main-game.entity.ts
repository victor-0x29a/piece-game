import { Piece } from '../../pieces/entities/piece.entity';

export class MainGame {}

export interface sorteds {
  Periféricos: Piece;
  'Placa de vídeo': Piece;
  Processadores: Piece;
  Refrigeração: Piece;
  Acessórios: Piece;
  Tela: Piece;
  Ambiente: Piece;
}

export interface PlayedStats {
  date: string;
}

export interface GamesPerProfile {
  title: string;
  description: string;
  day: string;
  playersOnGame: number;
  played: boolean;
  playedStats?: PlayedStats;
}
