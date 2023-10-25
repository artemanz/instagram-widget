import { Dispatch, useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { authStore } from "@/stores/auth";
import { useStore } from "effector-react";

interface Props {
  setauthType: Dispatch<IPopups>;
}

export const Header = ({ setauthType }: Props) => {
  const { user } = useStore(authStore);
  const [signButtons, setSignButtons] = useState(false);

  useEffect(() => {
    setSignButtons(true);
  }, []);

  const HeaderContent = () => {
    if (user)
      return (
        <div className="container flex items-center justify-between py-4">
          <Link href={"/"}>
            <Logo />
          </Link>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setauthType("signout")}
              className="link link-hover"
            >
              Sign Out
            </button>
          </div>
        </div>
      );
    else
      return (
        <div className="container flex justify-between py-4">
          <Link href={"/"}>
            <Logo />
          </Link>
          <div className="flex gap-4">
            <button onClick={() => setauthType("login")}>
              {signButtons ? "Login" : <span className="loading"></span>}
            </button>
          </div>
        </div>
      );
  };

  return (
    <header className="relative bg-base-200">
      <HeaderContent />
    </header>
  );
};
