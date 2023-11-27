"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { widgetApi, widgetStore } from "@/stores/widget";
import { useStore } from "effector-react";
import { popupApi } from "@/stores/popup";
import Link from "next/link";

export const Header = () => {
  const { constructorState } = useStore(widgetStore);
  const { setConstructorState } = widgetApi;
  const router = useRouter();

  const { setPopup } = popupApi;

  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    switch (constructorState) {
      case "theme":
        setTitle("Choose Template");
        setPublish(false);
        break;
      case "components":
        setTitle("Customize");
        setPublish(true);
        break;
    }
  }, [constructorState]);

  return (
    <header className="z-10 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4 text-base-200">
        <button
          className="transition-transform active:scale-90"
          onClick={() => {
            if (constructorState === "theme") router.back();
            if (constructorState === "components") setConstructorState("theme");
          }}
        >
          <svg
            width="43"
            height="23"
            viewBox="0 0 43 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.920476 10.6893C0.33469 11.2751 0.33469 12.2249 0.920476 12.8107L10.4664 22.3566C11.0522 22.9424 12.002 22.9424 12.5877 22.3566C13.1735 21.7708 13.1735 20.8211 12.5877 20.2353L4.10246 11.75L12.5877 3.26472C13.1735 2.67893 13.1735 1.72918 12.5877 1.1434C12.002 0.557612 11.0522 0.557612 10.4664 1.1434L0.920476 10.6893ZM42.0137 10.25L1.98114 10.25V13.25L42.0137 13.25V10.25Z"
              fill="#181920"
            />
          </svg>
        </button>

        <p>{title}</p>

        <div className="flex gap-4 items-center">
          <button
            disabled={!publish}
            className="btn btn-success"
            onClick={() => setPopup("widget_code")}
          >
            Publish
          </button>

          <Link href="/" className="link link-hover">
            Close
          </Link>
        </div>
      </div>
    </header>
  );
};
