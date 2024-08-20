import { z, ZodTypeAny } from 'zod';

export async function parseFormData<T>(request: Request): Promise<T> {
  return Object.fromEntries(await request.formData()) as T;
}

export type DTOToType<T extends ZodTypeAny> = z.infer<T>;
