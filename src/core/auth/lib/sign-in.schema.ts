import { z } from '@/shared/lib/forms';

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
