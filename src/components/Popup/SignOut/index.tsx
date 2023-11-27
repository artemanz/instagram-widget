import { authApi } from "@/stores/auth";
import { popupApi } from "@/stores/popup";
import { motion } from "framer-motion";

const SignOut = () => {
  const { setPopup } = popupApi;
  const { logOut } = authApi;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative text-center card-body bg-base-100 rounded-2xl"
    >
      <p className="text-xl">Are you really want to leave?</p>
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={() => logOut()} className="btn btn-error">
          Yes, I want to leave
        </button>
        <button onClick={() => setPopup(null)} className="btn">
          No, stay logged in
        </button>
      </div>
    </motion.div>
  );
};

export { SignOut };
