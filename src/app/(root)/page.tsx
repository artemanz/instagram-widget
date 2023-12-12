"use client";

import Link from "next/link";
import backgroundImage from "./images/background.png";
import Image from "next/image";
import { Header, Popup } from "@/components";
import { useStore } from "effector-react";
import { authStore } from "@/stores/auth";
import { popupApi } from "@/stores/popup";
import { PATH } from "@/common/path";

export default function Home() {
  const { user } = useStore(authStore);
  const { setPopup } = popupApi;

  return (
    <div className="grid h-screen [grid-auto-rows:auto_minmax(0,1fr)]">
      <Header />

      <main className="bg-gradient-primary relative">
        <Image
          priority
          src={backgroundImage.src}
          alt="Background image"
          fill
          className="object-cover z-0"
        />
        <div className="container relative text-center flex items-center flex-col justify-center h-full gap-4">
          <p className="text-2xl">
            Build Your Perfect <br className="md:hidden" /> Instagram Feed
            Widget
          </p>
          <h1 className="md:text-5xl text-4xl font-bold">
            Automatic Instagram Post <br className="hidden sm:block" /> Display
            on Your Website
          </h1>

          <Link
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                setPopup("login");
              }
            }}
            className="btn mt-4 btn-wide btn-lg"
            href={PATH.DASHBOARD}
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
