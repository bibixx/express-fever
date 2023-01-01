import { Options } from "../types/Options";

export interface UnreadItemsResponse {
  unread_item_ids: string;
}

export const getUnreadItems = async (options: Options): Promise<UnreadItemsResponse> => {
  const { items } = await options.getItems({});
  const unreadItems = items.reduce<number[]>((acc, item) => {
    if (!item.isRead) {
      acc.push(item.id);
    }

    return acc;
  }, []);

  return {
    unread_item_ids: unreadItems.join(","),
  };
};
