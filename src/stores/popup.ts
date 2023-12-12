import { createApi, createStore } from "effector";

export type TPopup = {
  popup: "login" | "signup" | "greetings" | "signout" | "widget_code" | "instagram_login" | null;
};

export const popupStore = createStore<TPopup>({
  popup: null,
});

export const popupApi = createApi(popupStore, {
  setPopup: (_, popup: TPopup["popup"]) => ({ popup }),
});
