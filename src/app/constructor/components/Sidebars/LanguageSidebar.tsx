import { widgetApi, widgetStore } from "@/stores/widget";
import { useStore } from "effector-react";

export const LanguageSidebar = () => {
  const { toggleHeader, toggleHeaderComponent } = widgetApi;
  const { header, headerComponents } = useStore(widgetStore);

  return (
    <div className="flex flex-col gap-8 px-2 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-4">
        <span>Language</span>
        <select className="w-full max-w-xs select" defaultValue={"English"}>
          <option>English</option>
          <option>בוודא</option>
          <option>بالطبع</option>
          <option>Español</option>
          <option>Український</option>
          <option>Hindi</option>
        </select>
      </div>
    </div>
  );
};
