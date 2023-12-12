import { createApi, createEffect, createStore } from "effector";
import {
  Timestamp,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { TWidget } from "./widget";
import { db } from "@/lib/firebase";

export type TFirebaseWidget = Omit<TWidget, "created" | "id"> & {
  created: Timestamp;
};

export const feedStore = createStore<{ feed: TWidget[] }>({
  feed: [],
});

export const feedApi = createApi(feedStore, {
  setFeed: (store, feed: TWidget[]) => {
    return { ...store, feed };
  },
  addNewWidget: (store, widget: TWidget) => {
    const newFeed = [...store.feed, widget];
    return { ...store, feed: newFeed };
  },
  removeWidget: (store, widget: TWidget) => {
    return { ...store, feed: store.feed.filter((w) => w.id !== widget.id) };
  },
});

export const addWidgetToDb = createEffect(async (newWidget: TWidget) => {
  try {
    const newItem: TFirebaseWidget = {
      ...newWidget,
      created: Timestamp.fromDate(newWidget.created),
    };
    await setDoc(doc(db, "widgets", newWidget.id), { ...newItem });
    return newItem;
  } catch (error) {
    return null;
  }
});
export const removeWidgetFromDb = createEffect(async (newWidget: TWidget) => {
  try {
    await deleteDoc(doc(db, "widgets", newWidget.id));
  } catch (error) {
    return error;
  }
});
export const updateWidgetInDb = createEffect(async (newWidget: TWidget) => {
  try {
    await setDoc(doc(db, "widgets", newWidget.id), newWidget);
  } catch (error) {
    return error;
  }
});
