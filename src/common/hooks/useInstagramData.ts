import { TInstagramData } from "@/app/constructor/@types";
import { useQuery } from "react-query";
import { getInstagramData } from "../querys/getInstagramData";
import { useStore } from "effector-react";
import { widgetStore } from "@/stores/widget";
import { authStore } from "@/stores/auth";

export const useInstagramData = () => {
  const { username } = useStore(widgetStore);
  const { user } = useStore(authStore);
  const { isLoading, error, data } = useQuery(
    ["instagram_data", username],
    () => getInstagramData(username!, user!.id),
    {
      select: (data) => {
        return data as TInstagramData;
      },
      enabled: !!username,
    }
  );

  return { isLoading, error, data };
};
