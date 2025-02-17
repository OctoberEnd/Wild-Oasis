/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import ModalContext from "../features/cabins/ModalContext";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//用于显示模态窗口的 React 组件 Modal
// export const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  // open(opensWindowName) 等价于 setOpenName(opensWindowName);
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}
// 用来监听触发打开模态窗口的事件
// 将 children 元素（通常是按钮或链接）包装成一个新的元素,保证可以添加onClick事件
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

// 是实际显示模态窗口的部分，通过 useContext 获取当前是否有模态窗口打开
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  // 自定义的 hook，用于监听用户点击窗口外部时关闭模态窗口
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      {/* 将这个 ref 赋给 <StyledModal> 元素，ref.current 就是指向 StyledModal 的 DOM 元素 */}
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
        {/* <div>{children}</div> */}
      </StyledModal>
    </Overlay>,
    // 选择body元素作为该渲染的父元素，但不影响原本的结构
    // 保证了原先的父元素的隐藏属性不会影响该元素
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
