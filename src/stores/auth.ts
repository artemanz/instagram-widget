import { auth } from "@/lib/firebase";
import { createApi, createEvent, createStore } from "effector";
import { User, signOut } from "firebase/auth";

type AuthStore = {
  user: User | null;
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
