"use client";

import { PiMagicWandLight } from "react-icons/pi";
import { LuSettings } from "react-icons/lu";
import { ThemeSettings } from "./components/ThemeSettings";
import { useState } from "react";
import clsx from "clsx";
import { HeaderSettings } from "./components/HeaderSettings";

type TSettings = "style" | "header";

const Footer = () => {
  const [currentSettings, setCurrentSettings] = useState<TSettings | null>(
    null
  );

  return (
    <footer className="fixed bottom-0 left-0 desktop:hidden w-full">
      <div className="absolute bottom-0 left-0 w-full bg-base-200 h-20 flex justify-center items-center gap-8 z-[1]">
        <button
          onClick={() =>
            setCurrentSettings((prev) => (prev === "style" ? null : "style"))
          }
          className={clsx(
            "flex flex-col items-center hover:text-primary transition-colors",
            currentSettings === "style" && "text-primary"
          )}
        >
          <PiMagicWandLight size={32} />
          Style
        </button>
        <button
          onClick={() =>
            setCurrentSettings((prev) => (prev === "header" ? null : "header"))
          }
          className={clsx(
            "flex flex-col items-center hover:text-primary transition-colors",
            currentSettings === "header" && "text-primary"
          )}
        >
          <LuSettings size={32} />
          Settings
        </button>
      </div>

      {currentSettings && (
        <div
          className="fixed inset-0"
          onClick={() => setCurrentSettings(null)}
        ></div>
      )}

      {currentSettings === "style" && <ThemeSettings />}
      {currentSettings === "header" && <HeaderSettings />}
    </footer>
  );
};

export { Footer };
