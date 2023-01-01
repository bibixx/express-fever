import { Feed } from "../types/Feed";

export const collectFeedsGroups = (feeds: Feed[]) => {
  const groupsMap = new Map<number, number[]>();

  feeds.forEach((feed) => {
    const feedsInGroup = groupsMap.get(feed.groupId) ?? [];
    feedsInGroup.push(feed.id);
    groupsMap.set(feed.groupId, feedsInGroup);
  });

  const groupsMapEntries = Array.from(groupsMap.entries());
  const feedsGroups = groupsMapEntries.map(([groupId, feedIds]) => ({
    group_id: groupId,
    feed_ids: feedIds.join(","),
  }));

  return feedsGroups;
};
