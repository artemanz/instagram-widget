"use client";

import { motion } from "framer-motion";

import { popupApi, popupStore } from "@/stores/popup";
import { useStore } from "effector-react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { PropsWithChildren } from "react";
import { SignOut } from "./SignOut";
import { CodeSnippet } from "./CodeSnippet";

const Popup = () => {
  const { popup } = useStore(popupStore);
  const { setPopup } = popupApi;

  if (!popup) return null;

  const PopupContent = () => {
    switch (popup) {
      case "login":
        return <SignIn />;
      case "signup":
        return <SignUp />;
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
        return <SignOut />;

      case "widget_code":
        return <CodeSnippet />;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-20 grid place-content-center">
      <div
        onClick={() => setPopup(null)}
        className="fixed inset-0 bg-black bg-opacity-50"
      />
      <PopupContent />
    </div>
  );
};

export { Popup };
