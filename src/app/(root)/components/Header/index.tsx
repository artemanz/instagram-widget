import Link from "next/link";
import { Logo } from "./Logo";
import { authStore } from "@/stores/auth";
import { useStore } from "effector-react";
import { popupApi } from "@/stores/popup";

export const Header = () => {
  const { user } = useStore(authStore);
  const { setPopup } = popupApi;

  return (
    <header className="relative bg-base-200">
      <div className="container flex justify-between py-4">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex gap-4">
          {user ? (
            <button
              onClick={() => setPopup("signout")}
              className="link link-hover"
            >
              Sign Out
            </button>
          ) : (
            <button onClick={() => setPopup("login")}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};
