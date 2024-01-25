import { auth } from "@/lib/firebase";
import { popupApi, popupStore } from "@/stores/popup";
import { useStore } from "effector-react";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { setPopup } = popupApi;
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<{ email: string }>();

  const submit = async (formData: { email: string }) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, formData.email);
      setPopup("reset_password_sent");
      setLoading(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("root", {
              message: "Invalid email",
            });
            break;
          default:
            setError("root", { message: error.code });
            break;
        }
      } else setError("root", { message: "Server error" });
    }
  };

  return (
    <div className="relative ">
      <motion.form
        onSubmit={handleSubmit(submit)}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-body bg-base-100 rounded-2xl text-white"
      >
        <div className="form-control">
          <div className="mb-4 text-lg">
            <span>Reset password</span>
          </div>
          <input
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            type="email"
            placeholder="email"
            className="input input-bordered"
          />
        </div>
        {errors.root && (
          <p className="text-center text-error">{errors.root?.message}</p>
        )}
        <button type="submit" className="mt-4 btn btn-primary">
          {loading ? <span className="loading loading-spinner" /> : "Reset"}
        </button>
      </motion.form>
    </div>
  );
};

export { ResetPassword };
