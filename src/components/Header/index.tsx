"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { authApi, authStore } from "@/stores/auth";
import { useStore } from "effector-react";
import { popupApi } from "@/stores/popup";
import { PATH } from "@/common/path";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user } = useStore(authStore);
  const { setPopup } = popupApi;
  const { logOut } = authApi;
  const router = useRouter();

  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement | null;
    if (elem) elem?.blur();
  };

  return (
    <header className="relative bg-base-200 text-white">
      <div className="container flex justify-between py-4 items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex gap-4">
          {user ? (
            <div tabIndex={0} role="button" className="dropdown dropdown-end">
              <div className="flex items-center gap-4">
                <p className="hidden sm:block">{user.email}</p>
                <div className="w-10 h-10 rounded-full bg-gradient-primary text-2xl uppercase grid place-content-center">
                  {user.email[0]}
                </div>
              </div>
              <nav
                tabIndex={0}
                className="p-2 dropdown-content z-[1] shadow rounded-box w-52 mt-2 bg-white text-base-300 list-none flex flex-col overflow-hidden"
              >
                <p className="p-4 cursor-auto">{user.email}</p>
                <hr className="my-1 border-black/25" />

                <Link
                  className=" p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  href={PATH.DASHBOARD}
                  onClick={() => {
                    closeDropdown();
                  }}
                >
                  Dashboard
                </Link>

                <Link
                  className=" p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  href={"#"}
                  onClick={() => {
                    closeDropdown();
                  }}
                >
                  Billing
                </Link>

                <hr className="my-1 border-black/25" />
                <Link
                  className=" p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  href={"#"}
                  onClick={() => {
                    closeDropdown();
                  }}
                >
                  Contact Support
                </Link>

                <button
                  className="text-left p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {
                    closeDropdown();
                    logOut();
                    router.replace(PATH.ROOT);
                  }}
                >
                  Sign Out
                </button>
              </nav>
            </div>
          ) : (
            <button onClick={() => setPopup("login")}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};
