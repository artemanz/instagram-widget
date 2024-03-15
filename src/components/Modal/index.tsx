import { motion } from "framer-motion";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  children,
  hide,
}: React.PropsWithChildren & {
  hide: () => void;
}) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-20 grid place-content-center">
      <div
        onClick={() => hide()}
        className="fixed inset-0 bg-black bg-opacity-50"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center card-body bg-base-100 rounded-2xl text-white"
      >
        <button onClick={hide} className="absolute right-2 top-2">
          <AiOutlineClose size={20} />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export { Modal };
