import { Options } from "../types/Options";
import { collectFeedsGroups } from "../utils/collectFeedsGroups";

interface ResponseFeed {
  id: number;
  favicon_id: number;
  title: string;
  url: string;
  site_url: string;
  is_spark: 0;
  last_updated_on_time: number;
}

interface FeedsGroup {
  group_id: number;
  feed_ids: string;
}

export interface FeedsResponse {
  feeds: ResponseFeed[];
  feeds_groups: FeedsGroup[];
}

export const feeds = async (options: Options): Promise<FeedsResponse> => {
  const feeds = await options.getFeeds();
  const responseFeeds = feeds.map((feed): ResponseFeed => {
    return {
      id: feed.id,
      favicon_id: feed.faviconId,
      title: feed.title,
      url: feed.url,
      site_url: feed.siteUrl,
      is_spark: 0,
      last_updated_on_time: Math.floor(feed.lastUpdatedOnTime.getTime() / 1000),
    };
  });

  const feedsGroups = collectFeedsGroups(feeds);

  return {
    feeds: responseFeeds,
    feeds_groups: feedsGroups,
  };
};
