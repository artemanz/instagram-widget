"use client";

import { useAuthState } from "@/common/hooks/useAuthState";
import { Popup } from "@/components";
import { Loader } from "@/components/UI";
import { authStore } from "@/stores/auth";
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
  const { setUsername } = widgetApi;

  useEffect(() => {
    const username = localStorage.getItem("instagram_username");
    if (username && typeof JSON.parse(username) === "string")
      setUsername(JSON.parse(username));
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
