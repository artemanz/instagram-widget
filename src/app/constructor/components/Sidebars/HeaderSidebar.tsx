import { widgetApi, widgetStore } from "@/stores/widget";
import { useStore } from "effector-react";

export const HeaderSidebar = () => {
  const { toggleHeader, toggleHeaderComponent } = widgetApi;
  const { header, headerComponents } = useStore(widgetStore);

  return (
    <div className="flex flex-col gap-8 px-2 overflow-y-auto custom-scrollbar">
      <label className="cursor-pointer label">
        <span>Show Header</span>
        <input
          checked={header}
          onChange={() => toggleHeader(!header)}
          type="checkbox"
          className="toggle toggle-secondary"
        />
      </label>

      <hr />
      <p>Header Elements</p>
      <ul>
        {Object.entries(headerComponents).map(([key, c]) => (
          <li key={c.name}>
            <label className="justify-start gap-4 cursor-pointer label">
              <input
                type="checkbox"
                className="checkbox checkbox-secondary"
                checked={c.checked}
                onChange={() =>
                  toggleHeaderComponent([
                    key as keyof typeof headerComponents,
                    { ...c, checked: !c.checked },
                  ])
                }
              />
              <span>{c.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
