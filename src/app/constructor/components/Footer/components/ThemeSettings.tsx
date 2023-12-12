import { widgetStore, widgetApi } from "@/stores/widget";
import { useStore } from "effector-react";
import {
  HexAlphaColorPicker,
  HexColorPicker,
  HexColorInput,
} from "react-colorful";

export const ThemeSettings = () => {
  const { theme } = useStore(widgetStore);
  const {
    changeThemeBackground,
    changeThemeColor,
    changeThemeBackgroundTransparency,
  } = widgetApi;

  return (
    <div className="bg-base-100 w-full max-h-[70vh] fixed bottom-20 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-8 px-2 max-w-xs mx-auto">
        <div className="flex flex-col gap-4 bg-base-100 rounded-xl p-4">
          <p className="text-center">Choose background color</p>
          <label className="cursor-pointer label">
            <span>Transparent background</span>
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              onChange={() =>
                changeThemeBackgroundTransparency(!theme.transparentBackground)
              }
              checked={theme.transparentBackground}
            />
          </label>
          {!theme.transparentBackground && (
            <div className="custom-layout">
              <HexAlphaColorPicker
                color={theme.backgroundColor}
                onChange={(color) => changeThemeBackground(color)}
              />
              <label className="flex items-center gap-4 px-4">
                Color:
                <HexColorInput
                  className="input input-bordered w-full"
                  color={theme.backgroundColor}
                  onChange={(color) => changeThemeBackground(color)}
                />
              </label>
            </div>
          )}
        </div>
        <hr />
        <div className="flex flex-col gap-4 bg-base-100 rounded-xl p-4">
          <p className="text-center">Choose text color</p>
          <div className="custom-layout">
            <HexColorPicker
              color={theme.textColor}
              onChange={(color) => changeThemeColor(color)}
            />
            <label className="flex items-center gap-4 px-4">
              Color:
              <HexColorInput
                className="input input-bordered w-full"
                color={theme.textColor}
                onChange={(color) => changeThemeColor(color)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
