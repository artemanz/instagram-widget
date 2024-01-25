import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { submit } from "./submit";
import { useRouter } from "next/navigation";
import { popupApi } from "@/stores/popup";
import { TForm } from "./@types";
import { useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";
import { PATH } from "@/common/path";

const SignIn = () => {
  const { setPopup } = popupApi;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<TForm>();

  const router = useRouter();

  const togglePassword = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  };

  return (
    <div className="relative ">
      <motion.form
        onSubmit={handleSubmit(async (formData) => {
          setLoading(true);
          await submit(formData, setError, () => router.push(PATH.DASHBOARD));
          setLoading(false);
        })}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-body bg-base-100 rounded-2xl text-white"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            type="email"
            placeholder="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", { required: true })}
            aria-invalid={errors.password ? "true" : "false"}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered"
          />
          <button
            onClick={togglePassword}
            type="button"
            className="absolute bottom-3.5 right-3.5 text-current text-xl text-white"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
        <label className="label p-0">
          <button
            onClick={() => setPopup("reset_password")}
            type="button"
            className="label-text-alt transition-colors hover:text-primary"
          >
            Forgot password?
          </button>
        </label>
        <div className="mt-2 form-control">
          {errors.root && (
            <p className="text-center text-error">{errors.root?.message}</p>
          )}
          <button type="submit" className="mt-4 btn btn-primary">
            {loading ? <span className="loading loading-spinner" /> : "Login"}
          </button>
        </div>
        <div className="mt-4 text-center label-text-alt">
          Still don't have an account? <br />
          Try to{" "}
          <button
            onClick={() => setPopup("signup")}
            type="button"
            className="underline transition-colors hover:text-primary"
          >
            Sign Up
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export { SignIn };
