import { z } from "zod";

export const GetItemsOptions = z.object({
  maxId: z.string().optional(),
  sinceId: z.string().optional(),
  withIds: z.string().optional(),
});

export type GetItemsOptions = z.infer<typeof GetItemsOptions>;
