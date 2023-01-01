import { Options } from "../types/Options";
import { collectFeedsGroups } from "../utils/collectFeedsGroups";

interface ResponseGroup {
  id: number;
  title: string;
}

interface FeedsGroup {
  group_id: number;
  feed_ids: string;
}

export interface GroupsResponse {
  groups: ResponseGroup[];
  feeds_groups: FeedsGroup[];
}

export const groups = async (options: Options): Promise<GroupsResponse> => {
  const [groupsPromise, feedsPromise] = [options.getGroups(), options.getFeeds()];

  const groups = await groupsPromise;
  const responseGroups = groups.map((group) => {
    return {
      id: group.id,
      title: group.title,
    };
  });

  const feeds = await feedsPromise;
  const feedsGroups = collectFeedsGroups(feeds);

  return {
    groups: responseGroups,
    feeds_groups: feedsGroups,
  };
};
