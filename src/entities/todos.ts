import { z } from 'zod';

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const todoMutatationS = z.object({
  title: z.string().min(1, 'required'),
  isCompleted: z.boolean(),
  todoId: z.string(),
});

export type TodoMutation = z.infer<typeof todoMutatationS>;
