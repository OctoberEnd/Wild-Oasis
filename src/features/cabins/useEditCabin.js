import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited!");
      // 每次突变后都希望refetch数据（数据指的是在usequery Hook中）
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // 重置表单
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCabin };
}
