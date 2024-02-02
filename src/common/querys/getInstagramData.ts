import { authStore } from "@/stores/auth";
import { useStore } from "effector-react";

export const getInstagramData = async (username: string, token: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API!, {
    headers: { Accept: "*/*", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ username, token }),
  });

  return await res.json();
};
