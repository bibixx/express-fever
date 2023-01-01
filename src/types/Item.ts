export interface Item {
  id: string;
  feedId: number;
  title: string;
  author: string;
  html: string;
  url: string;
  isSaved: boolean;
  isRead: boolean;
  createdOnTime: Date;
}
