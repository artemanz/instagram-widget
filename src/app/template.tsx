"use client";

import { useAuthState } from "@/common/hooks/useAuthState";
import { Popup } from "@/components";
import { Loader } from "@/components/UI";
import { authStore } from "@/stores/auth";
import { feedApi } from "@/stores/feed";
import { popupApi } from "@/stores/popup";
import { widgetApi } from "@/stores/widget";
import { useStore } from "effector-react";
import { PropsWithChildren, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const Root = ({ children }: PropsWithChildren) => {
  const { loading } = useAuthState();
  const { user } = useStore(authStore);
  const { setPopup } = popupApi;
  const { setWidgetData } = widgetApi;
  const { setFeed } = feedApi;

  useEffect(() => {
    if (user) {
      const widgetState = localStorage.getItem("widget_state");
      if (widgetState)
        setWidgetData(
          JSON.parse(widgetState, (key, value) => {
            if (key === "created") return new Date(value);
            return value
          })
        );
      setFeed(user.feed);
    }
    setPopup(null);
  }, [user]);

  if (loading)
    return (
      <div className="h-screen grid place-content-center text-primary">
        <Loader />
      </div>
    );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Popup />
    </QueryClientProvider>
  );
};

export default Root;
