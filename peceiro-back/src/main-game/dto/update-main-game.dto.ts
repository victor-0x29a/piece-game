import { z } from 'nestjs-zod/z';
import { CreateMainGameDto } from './create-main-game.dto';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateMainGameDto extends CreateMainGameDto {}

export const GameValidationUpdate = z.object({
  title: z
    .string({ required_error: 'O título é necessária.' })
    .min(12, 'O título deve ter no mínimo 12 caracteres.')
    .max(40, 'O título deve ter no máximo 40 caracteres.'),
  description: z
    .string({ required_error: 'A descrição é necessária.' })
    .min(12, 'A descrição deve ter no mínimo 12 caracteres.')
    .max(1200, 'A descrição deve ter no máximo 1200 caracteres.'),
  day: z
    .date({
      invalid_type_error: 'Data inválida.',
      required_error: 'A data é necessária.',
    })
    .max(new Date('2024-01-01'), { message: 'Data muito velha.' })
    .min(new Date(Date.now()), { message: 'Data muito nova.' }),
});
