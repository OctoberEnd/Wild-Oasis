import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited!");
      // 每次突变后都希望refetch数据（数据指的是在usequery Hook中）
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      // 重置表单
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}
