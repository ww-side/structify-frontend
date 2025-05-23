import { z } from '@/shared/lib/forms';

export const createColumnSchema = z.object({
  name: z.string().min(3).max(50).nonempty('Please provide a name'),
  dataType: z.enum(['text', 'number', 'select']),
});

export const updateColumnSchema = z.object({
  name: z.string().min(3).max(50).nonempty('Please provide a name'),
  variants: z.array(z.string()),
});
