import { createApi, createStore } from "effector";
import { Timestamp } from "firebase/firestore";
import { TWidget } from "./widget";

export type TFirebaseWidget = TWidget & {
  created: Timestamp;
  active: boolean;
};

export type TFeedWidget = Omit<TFirebaseWidget, "created"> & {
  created: number;
  id: string;
};

export const feedStore = createStore<{ feed: TFeedWidget[] }>({
  feed: [],
});

export const feedApi = createApi(feedStore, {
  setFeed: (store, feed: TFeedWidget[]) => {
    return { ...store, feed };
  },
  addNewWidget: (store, widget: TFeedWidget) => {
    const newFeed = [...store.feed, widget];
    return { ...store, feed: newFeed };
  },
  removeWidget: (store, widget: TFeedWidget) => {
    return { ...store, feed: store.feed.filter((w) => w.id !== widget.id) };
  },
});
