import { CategoryDto } from '../../pieces/dto/create-piece.dto';

export interface PiecePlay {
  id: number;
  categoryID: number;
}

export interface EnterPlay {
  items: PiecePlay[];
  gameID: number;
}

export type CategoryPlayDTO = Partial<CategoryDto>;

export interface ItemCheck {
  category: CategoryPlayDTO;
  itemID: number;
}
