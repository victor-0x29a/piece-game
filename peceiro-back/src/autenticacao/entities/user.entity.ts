import { z } from 'nestjs-zod/z';

export const registerSchema = z.object({
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
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(48, 'A senha deve ter no máximo 48 caracteres.'),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Confira o email!')
    .min(12, 'O e-mail deve ter no mínimo 12 caracteres.')
    .max(128, 'O e-mail deve ter no máximo 128 caracteres.'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
    .max(48, 'A senha deve ter no máximo 48 caracteres.'),
});
