import { z } from "zod";

const asValidator = z.union([z.literal("read"), z.literal("unread"), z.literal("saved"), z.literal("unsaved")]);

export const WriteItemRequest = z.object({
  mark: z.literal("item"),
  as: asValidator,
  id: z.coerce.number(),
});
export type WriteItemRequest = z.infer<typeof WriteItemRequest>;

export const WriteFeedOrGroupRequest = z.object({
  mark: z.union([z.literal("feed"), z.literal("group")]),
  as: asValidator,
  id: z.coerce.number(),
  before: z.number().transform((v) => new Date(v * 1000)),
});
export type WriteFeedOrGroupRequest = z.infer<typeof WriteFeedOrGroupRequest>;
