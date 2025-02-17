import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 为什么用mutation？
  // useQuery用于数据获取（如GET请求），而useMutation通常用来进行数据提交、更新等操作
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // 用来更新React Query缓存中的数据，成功登录时，将user.user信息存储到缓存中
      queryClient.setQueryData(["user"], user.user);
      // 跳转到/dashboard页面，并且用replace: true确保不会在浏览器历史记录中保留当前页面
      // 按浏览器的“后退”按钮，将不会返回到登录页
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
