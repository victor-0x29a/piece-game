import { z } from 'nestjs-zod/z';

export const PlayValidationCreate = z.object({
  gameID: z
    .number({ required_error: 'O gameID é necessário.' })
    .min(0, 'Confira o gameID.'),
  items: z
    .object(
      {
        id: z
          .number({ required_error: 'O itemID é necessário.' })
          .min(0, 'Confira o ID de algum dos items.'),
        categoryID: z
          .number({ required_error: 'O categoryID é necessário.' })
          .min(0, 'Confira a categoria de algum dos items.'),
      },
      { required_error: 'Confira os items.' },
    )
    .array()
    .min(7, { message: 'Mínimo e máximo de 7 items.' })
    .max(7, { message: 'Mínimo e máximo de 7 items.' }),
});
