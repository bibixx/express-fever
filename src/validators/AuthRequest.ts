import { z } from "zod";

export const AuthRequest = z.object({
  api_key: z.string(),
});
