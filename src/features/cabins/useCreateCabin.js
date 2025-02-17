import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created!");
      // 每次突变后都希望refetch数据（数据指的是在usequery Hook中）
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // 重置表单
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
