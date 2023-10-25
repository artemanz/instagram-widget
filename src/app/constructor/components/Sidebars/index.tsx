import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HeaderSidebar } from "./HeaderSidebar";
import { TemplateSidebar } from "./TemplateSidebar";
import clsx from "clsx";
import { LanguageSidebar } from "./LanguageSidebar";

export const Sidebar = () => {
  const [sidebarView, setsidebarView] = useState("template");
  const path = useSearchParams();

  useEffect(() => {
    const type = path.get("type");
    if (type) setsidebarView(type);
  }, [path]);

  return (
    <aside className="relative z-20 hidden p-5 text-white bg-base-200 lg:flex">
      <div className="flex flex-col justify-between w-full h-full gap-8">
        <div className="flex w-full overflow-hidden">
          <div
            className={clsx(
              "flex flex-col flex-shrink-0 max-h-full gap-8 basis-full transition-transform justify-between",
              sidebarView === "components" && "translate-x-[-100%]",
              sidebarView === "language" && "translate-x-[-200%]"
            )}
          >
            <TemplateSidebar />
            <Link
              href={"?type=components"}
              shallow={true}
              className="btn btn-success"
            >
              Continue with this template
            </Link>
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
