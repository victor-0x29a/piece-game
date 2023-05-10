import { z } from 'nestjs-zod/z';

export class User {}

export const UserValidationUpdate = z.object({
  email: z
    .string()
    .email('Confira o email!')
    .min(12, 'O e-mail deve ter no mínimo 12 caracteres.')
    .max(128, 'O e-mail deve ter no máximo 128 caracteres.'),
  name: z
    .string()
    .min(12, 'O nome deve ter no mínimo 12 caracteres.')
    .max(64, 'O nome deve ter no máximo 128 caracteres.'),
  phone: z.number(),
});
