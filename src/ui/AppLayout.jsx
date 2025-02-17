import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: grid; // 设置容器为网格布局
  grid-template-columns: 26rem 1fr; // 定义了两列：第一列宽度为 26rem，第二列为剩余空间 (1fr)
  grid-template-rows: auto 1fr; // 定义了两行：第一行高度自动，第二行高度为剩余空间 (1fr)
  height: 100vh; // 设置容器高度为视口高度
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll; //无论内容是否超出容器，都会显示滚动条
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledLayout>
      <Sidebar></Sidebar>
      <Header></Header>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
}

export default AppLayout;
