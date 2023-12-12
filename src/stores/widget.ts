import { createApi, createStore } from "effector";

type THeaderComponent = {
  name: string;
  checked: boolean;
};

export type TWidget = {
  id: string;
  username: string | null;
  created: Date;
  active: boolean;
  constructorState: "theme" | "components" | "language";
  theme: {
    backgroundColor: string;
    textColor: string;
    transparentBackground: boolean;
  };
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

type TWidgetStore = Omit<TWidget, "created" | "id"> & {
  id?: string;
  created?: Date;
};

export const initialWidget: TWidgetStore = {
  username: null,
  constructorState: "theme",
  active: false,
  theme: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    transparentBackground: true,
  },
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
};

export const widgetStore = createStore<TWidgetStore>(initialWidget);

export const widgetApi = createApi(widgetStore, {
  setConstructorState: (store, newState: TWidgetStore["constructorState"]) => ({
    ...store,
    constructorState: newState,
  }),
  changeThemeBackground: (
    store,
    color: TWidgetStore["theme"]["backgroundColor"]
  ) => ({
    ...store,
    theme: { ...store.theme, backgroundColor: color },
  }),
  changeThemeBackgroundTransparency: (
    store,
    transparent: TWidgetStore["theme"]["transparentBackground"]
  ) => ({
    ...store,
    theme: { ...store.theme, transparentBackground: transparent },
  }),
  changeThemeColor: (store, color: TWidgetStore["theme"]["textColor"]) => ({
    ...store,
    theme: { ...store.theme, textColor: color },
  }),
  pickView: (store, view: TWidgetStore["view"]) => ({
    ...store,
    view,
  }),
  toggleHeader: (state, payload: boolean) => ({ ...state, header: payload }),
  toggleHeaderComponent: (
    state,
    payload: [keyof TWidgetStore["headerComponents"], THeaderComponent]
  ) => {
    state.headerComponents[payload[0]] = payload[1];

    return { ...state };
  },
  reset: () => {
    localStorage.removeItem("widget_state");
    return { ...initialWidget };
  },
  setUsername: (store, payload: TWidgetStore["username"]) => {
    return { ...store, username: payload };
  },
  setWidgetData: (_, payload: TWidgetStore) => {
    localStorage.setItem("widget_state", JSON.stringify(payload));
    return payload;
  },
});
