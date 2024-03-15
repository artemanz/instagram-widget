import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submit } from "./submit";
import { popupApi } from "@/stores/popup";

export type TForm = {
  email: string;
  message: string;
};

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const { setPopup } = popupApi;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TForm>();

  return (
    <div className="relative">
      <motion.form
        onSubmit={handleSubmit(async (formData) => {
          setLoading(true);
          await submit(formData);
          setLoading(false);
          setPopup("feedback_sent");
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea
            {...register("message", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="message"
            className="textarea textarea-bordered resize-none h-24 placeholder:text-base custom-scrollbar"
          />
        </div>
        <div className="mt-2 form-control">
          {errors.root && (
            <p className="text-center text-error">{errors.root?.message}</p>
          )}
          <button type="submit" className="mt-4 btn btn-primary">
            {loading ? <span className="loading loading-spinner" /> : "Submit"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export { Feedback };
