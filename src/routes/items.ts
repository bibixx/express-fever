import { IntegerBoolean } from "../types/IntergerBoolean";
import { Options } from "../types/Options";
import { GetItemsOptions } from "../validators/GetItemsOptions";

interface ResponseItem {
  id: string;
  feed_id: number;
  title: string;
  author: string;
  html: string;
  url: string;
  is_saved: IntegerBoolean;
  is_read: IntegerBoolean;
  created_on_time: number;
}

export interface ItemsResponse {
  items: ResponseItem[];
  total_items: number;
}

export const items = async (options: Options, getItemsOptions: GetItemsOptions): Promise<ItemsResponse> => {
  const { items, total } = await options.getItems(getItemsOptions);
  const responseItems = items.map((item): ResponseItem => {
    return {
      id: item.id,
      feed_id: item.feedId,
      title: item.title,
      author: item.author,
      html: item.html,
      url: item.url,
      is_saved: item.isSaved ? 1 : 0,
      is_read: item.isRead ? 1 : 0,
      created_on_time: item.createdOnTime.getTime() / 1000,
    };
  });

  return {
    items: responseItems,
    total_items: total,
  };
};
