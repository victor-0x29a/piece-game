import { GameDto } from "../../../dto/game.dto";
import { CategoryDtoArray, CreatePieceDto } from "../../../dto/piece.dto";
import { account, pieces_atualization } from "../../../store/types/state.type";

export type gamePropsComponent = { games: GameDto[], setLoading: any }

export type gamePropsMain = { Account: account, pieces_atualization: pieces_atualization }

export type gameDialogPropsComponent = { Open: boolean, setOpen: any, Account: account, setLoading: any, Atualization: any, Game: GameDto }

export type gameCreatePropsComponent = { Open: boolean, setOpen: any, Account: account, setLoading: any, Atualization: any, Game: GameDto }

export type dataDayJs = {
    $d: Date
}