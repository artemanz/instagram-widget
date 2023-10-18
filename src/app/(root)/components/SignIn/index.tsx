import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { submit } from "./useSignIn";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  changeAuthType: Dispatch<SetStateAction<IPopups>>;
}

const SignIn = ({ changeAuthType }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IForm>();

  const [loading, setLoading] = useState(false);

  return (
    <div className="relative ">
      <motion.form
        onSubmit={handleSubmit((formData) => {
          setLoading(true);
          submit(formData, setError)
            .then((res) => {
              if (res) changeAuthType(null);
            })
            .finally(() => setLoading(false));
        })}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-body bg-base-100 rounded-2xl"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: true })}
            aria-invalid={errors.email ? true : false}
            type="email"
            placeholder="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", { required: true })}
            aria-invalid={errors.password ? true : false}
            type="password"
            placeholder="password"
            className="input input-bordered"
          />
          <label className="label">
            <button type="button" className="label-text-alt link link-hover">
              Forgot password?
            </button>
          </label>
        </div>
        <div className="mt-6 form-control">
          {errors.root && (
            <p className="text-center text-error">{errors.root?.message}</p>
          )}
          <button type="submit" className="mt-4 btn btn-primary">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <div className="mt-4 text-center label-text-alt">
          Still don't have an account? <br />
          Try to{" "}
          <button
            onClick={() => changeAuthType("signup")}
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
