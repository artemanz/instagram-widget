"use client";

import { useAuthState } from "@/common/hooks/useAuthState";
import { Loader } from "@/components/UI";
import { authStore } from "@/stores/auth";
import { popupApi } from "@/stores/popup";
import { useStore } from "effector-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const Root = ({ children }: PropsWithChildren) => {
  const { loading } = useAuthState();
  const { user } = useStore(authStore);
  const { setPopup } = popupApi;

  useEffect(() => {
    setPopup(null);
  }, [user]);

  if (loading)
    return (
      <div className="h-screen grid place-content-center text-primary">
        <Loader />
      </div>
    );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Root;
