import { Options } from "../types/Options";
import { WriteFeedOrGroupRequest } from "../validators/WriteRequest";

export type WriteFeedOrGroupResponse = Record<never, never>;

export const writeFeedOrGroup = async (
  options: Options,
  data: WriteFeedOrGroupRequest
): Promise<WriteFeedOrGroupResponse> => {
  if (data.mark === "feed") {
    await options.markFeed(data.id, data.as, data.before);
  } else {
    await options.markGroup(data.id, data.as, data.before);
  }

  return {};
};
