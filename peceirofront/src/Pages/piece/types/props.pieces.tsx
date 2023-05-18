import { CategoryDtoArray, CreatePieceDto } from "../../../dto/piece.dto";
import { account, pieces_atualization } from "../../../store/types/state.type";

export type piecePropsComponent = { pieces: CreatePieceDto[], categories: CategoryDtoArray[], setLoading: any }

export type piecePropsMain = { Account: account, pieces_atualization: pieces_atualization }

export type pieceDialogPropsComponent = { Piece: CreatePieceDto, Open: boolean, setOpen: any, Categories: CategoryDtoArray[], Account: account, setLoading: any, Atualization: any }

export type pieceCreatePropsComponent = { Open: boolean, setOpen: any, Categories: CategoryDtoArray[], Account: account, setLoading: any, Atualization: any }