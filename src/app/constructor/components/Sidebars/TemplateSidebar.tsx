import { widgetStore, widgetApi } from "@/stores/widget";
import { useStore } from "effector-react";
import {
  lightThemeSnapshot,
  darkThemeSnapshot,
  transparentThemeSnapshot,
} from "./images";
import Image from "next/image";

export const TemplateSidebar = () => {
  const { theme } = useStore(widgetStore);
  const { pickTheme } = widgetApi;
  const templateThemes: {
    id: TWidget["theme"];
    image: string;
    title: string;
  }[] = [
    {
      id: "light_theme",
      image: lightThemeSnapshot.src,
      title: "Light Theme",
    },
    {
      id: "dark_theme",
      image: darkThemeSnapshot.src,
      title: "Dark Theme",
    },
    {
      id: "transparent_theme",
      image: transparentThemeSnapshot.src,
      title: "Transparent Theme",
    },
  ];

  return (
    <div
      className={"flex flex-col gap-8 px-2 overflow-y-auto custom-scrollbar"}
    >
      {templateThemes.map(($theme) => {
        const currentTheme = theme === $theme.id;
        return (
          <button
            key={$theme.id}
            onClick={() => pickTheme($theme.id)}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={
                currentTheme
                  ? "border h-64 shrink-0 rounded-lg w-full border-secondary flex items-center justify-center p-4"
                  : "border h-64 shrink-0 rounded-lg w-full flex items-center justify-center p-4"
              }
            >
              <Image
                src={$theme.image}
                width={200}
                height={226}
                alt="Theme Snapshot"
              />
            </div>
            <p className={currentTheme ? "text-secondary" : ""}>
              {$theme.title}
            </p>
          </button>
        );
      })}
    </div>
  );
};
