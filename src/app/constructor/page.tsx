"use client";

import { redirect } from "next/navigation";
import { authStore } from "@/stores/auth";
import { useStore } from "effector-react";
import { Widget } from "./components";
import { widgetApi, widgetStore } from "@/stores/widget";
import { AiOutlineDesktop, AiOutlineMobile } from "react-icons/ai";
import { Sidebar } from "./components/Sidebars";

interface Props {}

const Constructor = () => {
  const { user } = useStore(authStore);
  const { view } = useStore(widgetStore);
  const { pickView } = widgetApi;
  if (!user) redirect("/");

  return (
    <main className="relative bg-white text-base-200 grid grid-rows-1 lg:grid-cols-[24rem_auto] w-screen">
      <Sidebar />
      {/* WIDGET */}
      <div className="flex flex-col items-center py-4 overflow-y-auto custom-scrollbar">
        <div className="flex gap-4 mx-auto">
          <button
            onClick={() => pickView("desktop")}
            className={` w-12 h-12 flex items-center justify-center rounded-lg  transition-colors ${
              view === "desktop"
                ? "bg-secondary text-white"
                : "bg-neutral-200 hover:bg-neutral-300 text-neutral-500"
            }`}
          >
            <AiOutlineDesktop />
          </button>
          <button
            onClick={() => pickView("mobile")}
            className={` w-12 h-12 flex items-center justify-center rounded-lg  transition-colors ${
              view === "mobile"
                ? "bg-secondary text-white"
                : "bg-neutral-200 hover:bg-neutral-300 text-neutral-500"
            }`}
          >
            <AiOutlineMobile />
          </button>
        </div>
        <Widget />
      </div>
    </main>
  );
};

export default Constructor;
