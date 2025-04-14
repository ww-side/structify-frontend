import { z } from '@/shared/lib/forms';

export const userAccountSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  email: z.string().email('Email is required'),
  firstName: z.string(),
  lastName: z.string(),
});
