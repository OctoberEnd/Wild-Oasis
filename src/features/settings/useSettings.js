import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  // useQuery 返回一个对象，包含与查询相关的状态
  // queryKey：一个标识查询的唯一键
  // queryFn：执行查询的函数

  return { isLoading, error, settings };
}
