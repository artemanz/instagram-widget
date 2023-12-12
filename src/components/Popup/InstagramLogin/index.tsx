import { getInstagramData } from "@/common/querys/getInstagramData";
import { addRefToFeed, authStore } from "@/stores/auth";
import { addWidgetToDb, feedApi } from "@/stores/feed";
import { popupApi } from "@/stores/popup";
import { initialWidget, widgetApi } from "@/stores/widget";
import { useStore } from "effector-react";
import { motion } from "framer-motion";
import { FormEventHandler, useState } from "react";
import { uid } from "uid";

const InstagramLogin = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useStore(authStore);

  const { setWidgetData } = widgetApi;
  const { addNewWidget } = feedApi;
  const { setPopup } = popupApi;

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await getInstagramData(usernameInput);
    if (!res) setError("User doesn't exist");
    else {
      const newWidget = {
        ...initialWidget,
        id: uid(),
        created: new Date(),
        username: usernameInput,
      };
      setError("");

      const ref = await addWidgetToDb(newWidget);
      if (ref) {
        setWidgetData(newWidget);
        addRefToFeed({ userId: user!.id, widgetId: newWidget.id });
        addNewWidget(newWidget);
        setPopup(null);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={(e) => submit(e)}
      className="card-body bg-base-100 rounded-2xl relative"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-white text-2xl font-bold">Create Widget</h2>

      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">Enter instagram username</span>
        </label>
        <input
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          type="text"
          placeholder="Username"
          className="input input-bordered text-white"
        />
      </div>

      <p className="text-center text-error">{error}</p>

      <button
        className="btn btn-primary mt-4"
        disabled={!usernameInput || loading}
      >
        {loading ? <span className="loading"></span> : "Continue"}
      </button>
    </motion.form>
  );
};

export { InstagramLogin };
