"use client";

import { useEffect } from "react";
import { Widget } from "./components";
import { Sidebar } from "./components/Sidebars";
import { useRouter } from "next/navigation";
import { useStore } from "effector-react";
import { widgetStore } from "@/stores/widget";
import { PATH } from "@/common/path";

const Constructor = () => {
  const { username } = useStore(widgetStore);
  const router = useRouter();

  useEffect(() => {
    if (!username) router.replace(PATH.DASHBOARD);
  }, []);

  if (!username) return null;

  return (
    <main className="relative bg-white grid grid-rows-1 desktop:grid-cols-[24rem_auto] w-screen pb-20 desktop:pb-0">
      <Sidebar />
      <Widget />
    </main>
  );
};

export default Constructor;
