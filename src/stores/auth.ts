import { auth } from "@/lib/firebase";
import { createApi, createStore } from "effector";
import { User, signOut } from "firebase/auth";

type AuthStore = {
  user: { email: string; instagramLogin: string } | null;
};

export const authStore = createStore<AuthStore>({
  user: null,
});

export const authApi = createApi(authStore, {
  setUser: (store, user) => ({ ...store, user }),
  logOut() {
    signOut(auth);
  },
});
