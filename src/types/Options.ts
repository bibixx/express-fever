import { GetItemsOptions } from "../validators/GetItemsOptions";
import { Favicon } from "./Favicon";
import { Feed } from "./Feed";
import { Group } from "./Group";
import { Item } from "./Item";

type MaybePromise<T> = T | Promise<T>;

type ItemState = "read" | "saved" | "unsaved" | "unread";

export interface Options {
  authenticateUser: (apiKey: string) => MaybePromise<boolean>;
  getLastRefreshedOnTime: () => MaybePromise<Date>;
  getFavicons: () => MaybePromise<Favicon[]>;
  getFeeds: () => MaybePromise<Feed[]>;
  getGroups: () => MaybePromise<Group[]>;
  getItems: (options: GetItemsOptions) => MaybePromise<{ items: Item[]; total: number }>;
  markItem: (id: number, state: ItemState) => MaybePromise<void>;
  markGroup: (groupId: number, state: ItemState, before: Date) => MaybePromise<void>;
  markFeed: (feedId: number, state: ItemState, before: Date) => MaybePromise<void>;
}
