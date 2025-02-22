import { z } from '@/shared/lib/forms';

export const signUpSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
