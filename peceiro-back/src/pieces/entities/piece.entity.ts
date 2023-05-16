import { z } from 'nestjs-zod/z';
import { CreatePieceDto } from '../dto/create-piece.dto';
export type Piece = CreatePieceDto;

export const PieceValidationCreate = z.object({
  category: z.object({
    name: z
      .string()
      .min(12, 'O nome da categoria deve ter no mínimo 4 caracteres.')
      .max(64, 'O nome da categoria deve ter no máximo 28 caracteres.'),
    id: z.number(),
  }),
  product: z
    .string()
    .min(12, 'O nome deve ter no mínimo 12 caracteres.')
    .max(64, 'O nome deve ter no máximo 128 caracteres.'),
});
// 'Categoria inválida.'
