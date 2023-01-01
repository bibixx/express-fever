import { z } from "zod";

export const GetItemsOptions = z.object({
  max_id: z.coerce.number().optional(),
  since_id: z.coerce.number().optional(),
  with_ids: z
    .string()
    .transform((value) => value.split(",").map((s) => Number.parseInt(s.trim(), 10)))
    .optional(),
});

export type GetItemsOptions = z.infer<typeof GetItemsOptions>;
