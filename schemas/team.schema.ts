import { z } from 'zod';

export const teamSchema = z.object({
  name: z
    .string({ required_error: 'Campo obrigatório.' })
    .min(1, 'deve ter pelo menos 1 caractere')
    .max(150, 'deve ter no máximo 150 caracteres'),
  color: z
    .string({ required_error: 'Campo obrigatório.' })
    .regex(/^#([A-Fa-f0-9]{6})$/, {
      message: 'Deve ser no formato #RRGGBB.',
    }),
});

export const teamEntitySchema = teamSchema.extend({
  id: z.number(),
});

export type TeamEntitySchema = z.infer<typeof teamSchema> & {
  id: number;
};
export type TeamSchema = z.infer<typeof teamSchema>;
