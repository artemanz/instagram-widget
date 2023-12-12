import { TInstagramData } from "@/app/constructor/@types";
import { useQuery } from "react-query";
import { getInstagramData } from "../querys/getInstagramData";
import { useStore } from "effector-react";
import { widgetStore } from "@/stores/widget";

export const useInstagramData = () => {
  const { username } = useStore(widgetStore);
  const { isLoading, error, data } = useQuery(
    ["instagram_data", username],
    () => getInstagramData(username!),
    {
      select: (data) => {
        return data as TInstagramData;
      },
      enabled: !!username,
    }
  );

  return { isLoading, error, data };
};
