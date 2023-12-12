"use client";

import { authStore } from "@/stores/auth";
import { useStore } from "effector-react";
import { redirect } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const Protect = ({ children }: PropsWithChildren) => {
  const { user } = useStore(authStore);

  useEffect(() => {
    if (!user) redirect("/");
  }, []);

  if (!user) return null;

  return children;
};

export { Protect };
