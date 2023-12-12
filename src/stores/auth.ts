import { auth, db } from "@/lib/firebase";
import { createApi, createEffect, createStore } from "effector";
import { signOut } from "firebase/auth";
import { TWidget } from "./widget";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

type AuthStore = {
  user: { email: string; id: string; feed: TWidget[] } | null;
};

export const authStore = createStore<AuthStore>({
  user: null,
});

export const authApi = createApi(authStore, {
  setUser: (store, user) => {
    return { ...store, user };
  },
  setFeed: (store, feed) => {
    return { ...store, feed };
  },
  logOut() {
    signOut(auth);
  },
});

export const addRefToFeed = createEffect(
  async ({ userId, widgetId }: { userId: string; widgetId: string }) => {
    await updateDoc(doc(db, "users", userId), {
      feed: arrayUnion(doc(db, "widgets", widgetId)),
    });
  }
);
export const removeRefFromFeed = createEffect(
  async ({ userId, widgetId }: { userId: string; widgetId: string }) => {
    await updateDoc(doc(db, "users", userId), {
      feed: arrayRemove(doc(db, "widgets", widgetId)),
    });
  }
);
