import { Options } from "../types/Options";

export interface SavedItemsResponse {
  saved_item_ids: string;
}

export const getSavedItems = async (options: Options): Promise<SavedItemsResponse> => {
  const { items } = await options.getItems({});
  const savedItems = items.reduce<string[]>((acc, item) => {
    if (item.isSaved) {
      acc.push(item.id);
    }

    return acc;
  }, []);

  return {
    saved_item_ids: savedItems.join(","),
  };
};
