import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { submit } from "./useSignUp";

interface Props {
  changeAuthType: Dispatch<SetStateAction<IPopups>>;
}

const SignUp = ({ changeAuthType }: Props) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePassword = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  };

  return (
    <div className="relative ">
      <motion.form
        onSubmit={handleSubmit((formData) => {
          setLoading(true);
          submit(formData, setError, () => changeAuthType("greetings")).finally(
            () => setLoading(false)
          );
        })}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-body bg-base-100 rounded-2xl"
      >
        {/* EMAIL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email*</span>
          </label>
          <input
            {...register("email", { required: true })}
            aria-invalid={errors.email ? true : false}
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
            aria-invalid={errors.password ? true : false}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered"
          />
          <button
            onClick={togglePassword}
            type="button"
            className="absolute bottom-3.5 right-3.5 text-current text-xl"
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
            aria-invalid={errors.confirmPassword ? true : false}
            type={showPassword ? "text" : "password"}
            placeholder="confirm password"
            className="input input-bordered"
          />
          <button
            onClick={togglePassword}
            type="button"
            className="absolute bottom-3.5 right-3.5 text-current text-xl"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>

        {/* INSTAGRAM LOGIN */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instagram Login*</span>
          </label>
          <input
            {...register("instagramLogin", { required: true })}
            aria-invalid={errors.instagramLogin ? true : false}
            type="text"
            placeholder="instagram login"
            className="input input-bordered"
          />
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
            onClick={() => changeAuthType("login")}
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
