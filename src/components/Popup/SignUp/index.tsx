import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { submit } from "./submit";
import { TForm } from "./@types";
import { popupApi } from "@/stores/popup";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/common/hooks/useAuthState";
import { PATH } from "@/common/path";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<TForm>();

  const { setPopup } = popupApi;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePassword = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  };

  const router = useRouter();
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
        {/* EMAIL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email*</span>
          </label>
          <input
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            type="email"
            placeholder="email"
            className="input input-bordered"
          />
        </div>

        {/* PASSWORD */}
        <div className="relative form-control">
          <label className="label">
            <span className="label-text">Password*</span>
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

        {/* CONFIRM PASSWORD */}
        <div className="relative form-control">
          <label className="label">
            <span className="label-text">Confirm password*</span>
          </label>
          <input
            {...register("confirmPassword", { required: true })}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            type={showPassword ? "text" : "password"}
            placeholder="confirm password"
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

        {/* CONTROLS */}
        <div className="mt-6 form-control">
          {errors.root && (
            <p className="text-center text-error">{errors.root?.message}</p>
          )}
          <button type="submit" className="mt-4 btn btn-primary">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Create account"
            )}
          </button>
        </div>
        <div className="mt-4 text-center label-text-alt">
          Already have an account? <br />
          Try to{" "}
          <button
            onClick={() => setPopup("login")}
            type="button"
            className="underline transition-colors hover:text-primary"
          >
            Log In
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export { SignUp };
