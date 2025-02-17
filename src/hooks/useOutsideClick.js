import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  // 创建一个引用
  const ref = useRef();

  //useEffect 用于处理副作用，添加和清理事件监听器s
  useEffect(
    function () {
      function handleClick(e) {
        // 检查点击的目标 (e.target) 是否在 ref.current 指向的元素内
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      //    给 document 添加 'click' 事件监听
      //    第三个参数，使得你可以控制事件是采用捕获还是冒泡方式。设置为 true: 捕获阶段触发
      document.addEventListener("click", handleClick, listenCapturing);
      // 返回一个清理函数，在组件卸载时移除事件监听
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    // 空依赖数组表示只在组件挂载和卸载时执行一次
    [handler, listenCapturing]
  );
  // ref 被返回，允许你将其赋给需要监听外部点击事件的 DOM 元素
  return ref;
}
