import { FaviconsResponse } from "../routes/favicons";
import { FeedsResponse } from "../routes/feeds";
import { SavedItemsResponse } from "../routes/getSavedItems";
import { UnreadItemsResponse } from "../routes/getUnreadItems";
import { GroupsResponse } from "../routes/groups";
import { ItemsResponse } from "../routes/items";
import { WriteFeedOrGroupResponse } from "../routes/writeFeedOrGroup";
import { WriteItemResponse } from "../routes/writeItem";

export type RouteResponse =
  | FaviconsResponse
  | FeedsResponse
  | SavedItemsResponse
  | UnreadItemsResponse
  | GroupsResponse
  | ItemsResponse
  | WriteFeedOrGroupResponse
  | WriteItemResponse;
