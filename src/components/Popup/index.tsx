"use client";

import { motion } from "framer-motion";

import { popupApi, popupStore } from "@/stores/popup";
import { useStore } from "effector-react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { SignOut } from "./SignOut";
import { CodeSnippet } from "./CodeSnippet";
import { InstagramLogin } from "./InstagramLogin";
import { ResetPassword } from "./ResetPassword";
import { Feedback } from "./Feedback";
import { useEffect } from "react";

const Popup = () => {
  const { popup } = useStore(popupStore);
  const { setPopup } = popupApi;

  useEffect(() => {
    if (popup) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [popup]);

  if (!popup) return null;

  const PopupContent = () => {
    switch (popup) {
      case "login":
        return <SignIn />;
      case "signup":
        return <SignUp />;
      case "reset_password_sent":
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center card-body bg-base-100 rounded-2xl text-white"
          >
            We sent reset password link to your email adress.
          </motion.div>
        );
      case "signout":
        return <SignOut />;

      case "widget_code":
        return <CodeSnippet />;

      case "instagram_login":
        return <InstagramLogin />;

      case "reset_password":
        return <ResetPassword />;

      case "feedback":
        return <Feedback />;

      case "feedback_sent":
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center card-body bg-base-100 rounded-2xl text-white"
          >
            Thank you, your form has been submitted
          </motion.div>
        );

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
