import { authStore } from "@/stores/auth";
import { useStore } from "effector-react";

export const getInstagramData = async (username: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API!, {
    headers: { Accept: "*/*", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username }),
  });

  return await res.json();
};
