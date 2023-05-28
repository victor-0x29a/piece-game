import { z } from 'nestjs-zod/z';

export interface CreateMainGameDto {
  title: string;
  description: string;
  day: Date;
}

export const GameValidationCreate = z.object({
  title: z
    .string({ required_error: 'O título é necessária.' })
    .min(12, 'O título deve ter no mínimo 12 caracteres.')
    .max(40, 'O título deve ter no máximo 40 caracteres.'),
  description: z
    .string({ required_error: 'A descrição é necessária.' })
    .min(12, 'A descrição deve ter no mínimo 12 caracteres.')
    .max(1200, 'A descrição deve ter no máximo 1200 caracteres.'),
  day: z
    .string()
    .regex(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    ),
});
