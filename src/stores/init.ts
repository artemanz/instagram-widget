import { TWidgetStore, widgetApi, widgetStore } from "./widget";
import { useEffect } from "react";

export function setInitialStores() {
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
}

export function useInitialStores() {
  useEffect(() => {
    setInitialStores();
  }, []);
}
