import { CreatePieceDto } from "../../../dto/piece.dto";
import { account } from "../../../store/types/state.type";

export type piecePropsComponent = { pieces: CreatePieceDto[] }

export type piecePropsMain = { Account: account }