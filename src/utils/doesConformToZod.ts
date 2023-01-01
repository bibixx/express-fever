import { ZodType } from "zod";

export const doesConformToZod = (validator: ZodType, data: unknown) => {
  const result = validator.safeParse(data);

  return result.success;
};
