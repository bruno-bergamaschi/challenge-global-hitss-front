import { z } from 'zod';
import { teamEntitySchema } from './team.schema';

export const taskSchema = z.object({
  title: z
    .string({ required_error: 'Campo obrigatório.' })
    .min(1, 'deve ter pelo menos 1 caracteres')
    .max(150, 'deve ter no máximo 150 caracteres'),
  description: z
    .string({ required_error: 'Campo obrigatório.' })
    .min(1, 'A descrição é obrigatória'),
  status: z.enum(['pending', 'in_progress', 'concluded']),
  teams: z.array(teamEntitySchema),
});

export const taskEntitySchema = taskSchema.extend({
  id: z.number(),
});

export type TaskEntitySchema = z.infer<typeof taskSchema> & {
  id: number;
};

export type TaskSchema = z.infer<typeof taskSchema>;
