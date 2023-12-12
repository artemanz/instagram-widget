import { auth } from "@/lib/firebase";
import { createApi, createStore } from "effector";
import { signOut } from "firebase/auth";
import { TFeedWidget } from "./feed";

type AuthStore = {
  user: { email: string } | null;
  feed: TFeedWidget[];
};

export const authStore = createStore<AuthStore>({
  user: null,
  feed: [],
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
