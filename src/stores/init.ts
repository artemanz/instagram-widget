import { authStore } from "./auth";
import { TWidgetStore, widgetApi, widgetStore } from "./widget";
import { useEffect } from "react";

export async function setInitialStores() {
  let initialWidget: TWidgetStore | string | null =
    window.localStorage.getItem("widget_state");
  if (initialWidget) {
    initialWidget = JSON.parse(initialWidget) as TWidgetStore;
    widgetApi.setState(initialWidget);
  }

  widgetStore.watch((state) => {
    if (state) {
      window.localStorage.setItem("widget_state", JSON.stringify(state));
    }
  });

  authStore.watch((state) => {
    if (state) window.localStorage.setItem("user", JSON.stringify(state.user));
  });
}

export function useInitialStores() {
  useEffect(() => {
    setInitialStores();
  }, []);
}
