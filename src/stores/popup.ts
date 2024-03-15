import { createApi, createStore } from "effector";

export type TPopup = {
  popup:
    | "login"
    | "signup"
    | "reset_password_sent"
    | "signout"
    | "widget_code"
    | "instagram_login"
    | "reset_password"
    | "feedback"
    | "feedback_sent"
    | null;
};

export const popupStore = createStore<TPopup>({
  popup: null,
});

export const popupApi = createApi(popupStore, {
  setPopup: (_, popup: TPopup["popup"]) => ({ popup }),
});
