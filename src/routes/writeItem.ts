import { Options } from "../types/Options";
import { WriteItemRequest } from "../validators/WriteRequest";

export type WriteItemResponse = Record<never, never>;

export const writeItem = async (options: Options, data: WriteItemRequest): Promise<WriteItemResponse> => {
  await options.markItem(data.id, data.as);

  return {};
};
