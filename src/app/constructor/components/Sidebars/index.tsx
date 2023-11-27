"use client"

import { useEffect, useState } from "react";
import { HeaderSidebar } from "./HeaderSidebar";
import { ThemeSidebar } from "./ThemeSidebar";
import clsx from "clsx";
import { LanguageSidebar } from "./LanguageSidebar";
import { useStore } from "effector-react";
import { widgetApi, widgetStore } from "@/stores/widget";

export const Sidebar = () => {
  const [sidebarView, setsidebarView] = useState("template");
  const { constructorState } = useStore(widgetStore);

  useEffect(() => {
    setsidebarView(constructorState);
  }, [constructorState]);

  return (
    <aside className="relative z-20 desktop:flex p-5 text-white bg-base-200 hidden">
      <div className="flex flex-col justify-between w-full h-full gap-8">
        <div className="flex w-full overflow-hidden">
          <div
            className={clsx(
              "flex flex-col flex-shrink-0 max-h-full gap-8 basis-full transition-transform justify-between",
              sidebarView === "components" && "translate-x-[-100%]",
              sidebarView === "language" && "translate-x-[-200%]"
            )}
          >
            <ThemeSidebar />
            <button
              onClick={() => widgetApi.setConstructorState("components")}
              className="btn btn-success"
            >
              Continue with this template
            </button>
          </div>

          <div
            className={clsx(
              "flex flex-col flex-shrink-0 max-h-full gap-8 basis-full transition-transform justify-between",
              sidebarView === "components" && "translate-x-[-100%]",
              sidebarView === "language" && "translate-x-[-200%]"
            )}
          >
            <HeaderSidebar />
            {/* <Link href={"?type=language"} className="btn btn-success">
              Continue
            </Link> */}
          </div>

          <div
            className={clsx(
              "flex flex-col flex-shrink-0 max-h-full gap-8 basis-full transition-transform justify-between",
              sidebarView === "components" && "translate-x-[-100%]",
              sidebarView === "language" && "translate-x-[-200%]"
            )}
          >
            <LanguageSidebar />
          </div>
        </div>
      </div>
    </aside>
  );
};
