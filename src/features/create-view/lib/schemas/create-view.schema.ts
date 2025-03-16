import { z } from '@/shared/lib/forms';

export const createViewSchema = z.object({
  name: z.string().nonempty('Please provide a name'),
  formats: z.array(z.enum(['table', 'list'])),
  icon: z.string(),
});
