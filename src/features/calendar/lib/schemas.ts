import { z } from "@/shared/lib/forms";

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  location: z.string(),
  notes: z.string(),
  start: z.date(),
  end: z.date(),
});