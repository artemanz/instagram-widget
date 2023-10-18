import { createApi, createStore } from "effector";

type THeaderComponent = {
  name: string;
  checked: boolean;
};

export type TWidgetStore = {
  theme: "light_theme" | "dark_theme" | "transparent_theme";
  view: "desktop" | "mobile";
  header: boolean;
  headerComponents: {
    profilePicture: THeaderComponent;
    fullName: THeaderComponent;
    username: THeaderComponent;
    verifiedBadge: THeaderComponent;
    postCount: THeaderComponent;
    followersCount: THeaderComponent;
    followingCount: THeaderComponent;
    followButton: THeaderComponent;
  };
};

export const widgetStore = createStore<TWidgetStore>({
  theme: "light_theme",
  view: "desktop",
  header: true,
  headerComponents: {
    profilePicture: {
      name: "Profile Picture",
      checked: true,
    },
    fullName: {
      name: "Full Name",
      checked: true,
    },
    username: {
      name: "Username",
      checked: true,
    },
    verifiedBadge: {
      name: "Verified Badge",
      checked: true,
    },
    postCount: {
      name: "Post Count",
      checked: true,
    },
    followersCount: {
      name: "Followers Count",
      checked: true,
    },
    followingCount: {
      name: "Following Count",
      checked: true,
    },
    followButton: {
      name: "Follow Button",
      checked: true,
    },
  },
});

export const widgetApi = createApi(widgetStore, {
  pickTheme: (store, theme: TWidgetStore["theme"]) => ({
    ...store,
    theme,
  }),
  pickView: (store, view: TWidgetStore["view"]) => ({
    ...store,
    view,
  }),
  setState: (_, payload: TWidgetStore) => payload,
  toggleHeader: (state, payload: boolean) => ({ ...state, header: payload }),
  toggleHeaderComponent: (
    state,
    payload: [keyof TWidgetStore["headerComponents"], THeaderComponent]
  ) => {
    state.headerComponents[payload[0]] = payload[1];

    return { ...state };
  },
});
