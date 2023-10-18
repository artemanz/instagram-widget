import { useEffect, useState } from "react";
import { SignIn, SignUp } from "..";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { authApi, authStore } from "@/stores/auth";
import { useStore } from "effector-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Header = () => {
  const { user } = useStore(authStore);
  const { logOut } = authApi;

  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [signButtons, setSignButtons] = useState(false);
  const [authType, setauthType] = useState<IPopups>(null);

  useEffect(() => {
    if (search.get("login")) setauthType("login");
  }, [search]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.emailVerified) authApi.setUser(currentUser);
      else authApi.setUser(null);

      setSignButtons(true);
    });

    return () => unsubscribe();
  }, []);

  const Popup = () => {
    switch (authType) {
      case "login":
        return <SignIn changeAuthType={setauthType} />;
      case "signup":
        return <SignUp changeAuthType={setauthType} />;
      case "greetings":
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center card-body bg-base-100 rounded-2xl"
          >
            We sent verification link to your email adress.
          </motion.div>
        );
      case "signout":
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center card-body bg-base-100 rounded-2xl"
          >
            <p className="text-xl">Are you really want to leave?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  logOut();
                  setauthType(null);
                }}
                className="btn btn-error"
              >
                Yes, I want to leave
              </button>
              <button onClick={() => setauthType(null)} className="btn">
                No, stay logged in
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

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
            <button onClick={() => setauthType("login")} className="">
              {signButtons ? "Login" : <span className="loading"></span>}
            </button>
          </div>
        </div>
      );
  };

  return (
    <header className="relative bg-base-200">
      <HeaderContent />

      {authType && (
        <div className="fixed inset-0 z-20 grid place-content-center">
          <div
            onClick={() => {
              setauthType(null);
              router.push(pathname);
            }}
            className="fixed inset-0 bg-black bg-opacity-50"
          />
          <Popup />
        </div>
      )}
    </header>
  );
};
