import { motion } from "framer-motion";
import { SignIn, SignUp } from "..";
import { Dispatch, SetStateAction } from "react";
import { authApi } from "@/stores/auth";

interface Props {
  authType: IPopups;
  setauthType: Dispatch<SetStateAction<IPopups>>;
}

const Popup = ({ authType, setauthType }: Props) => {
  const { logOut } = authApi;

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

export { Popup };
