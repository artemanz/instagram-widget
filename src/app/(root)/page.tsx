"use client";

import Link from "next/link";
import backgroundImage from "./images/background.png";
import Image from "next/image";
import { authStore } from "@/stores/auth";
import { useStore } from "effector-react";
import { useState } from "react";
import { Header, Popup } from "./components";

export default function Home() {
  const { user } = useStore(authStore);
  const [authType, setauthType] = useState<IPopups>(null);
  console.log(process.env.NEXT_PUBLIC_HOST);
  return (
    <div className="grid h-screen [grid-auto-rows:auto_minmax(0,1fr)]">
      <Header setauthType={setauthType} />

      <main className="bg-gradient-primary relative">
        <Image
          priority
          src={backgroundImage.src}
          alt="Background image"
          fill
          className="object-cover z-0"
        />
        <div className="container relative text-center flex items-center flex-col justify-center h-full gap-4">
          <p className="text-base-200 text-2xl">
            Build Your Perfect <br className="md:hidden" /> Instagram Feed
            Widget
          </p>
          <h1 className="text-base-200 md:text-5xl text-4xl font-bold">
            Automatic Instagram Post <br className="hidden sm:block" /> Display
            on Your Website
          </h1>
          {user ? (
            <Link className="btn mt-4 btn-wide btn-lg" href={"/constructor"}>
              Create Widget
            </Link>
          ) : (
            <button
              className="btn mt-4 btn-wide btn-lg"
              onClick={() => setauthType("login")}
            >
              Create Widget
            </button>
          )}
        </div>
      </main>

      {authType && (
        <div className="fixed inset-0 z-20 grid place-content-center">
          <div
            onClick={() => setauthType(null)}
            className="fixed inset-0 bg-black bg-opacity-50"
          />
          <Popup authType={authType} setauthType={setauthType} />
        </div>
      )}
    </div>
  );
}
