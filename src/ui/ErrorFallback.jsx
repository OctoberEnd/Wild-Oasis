/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  console.log("ErrorFallback 被触发", error);
  return (
    <>
      <GlobalStyles></GlobalStyles>

      <StyledErrorFallback>
        <Box>
          <Heading as="h1">某些地方出错了!🤔</Heading>
          {/* error 可能是一个 Error 实例(对象), React 组件的 {} 语法只支持字符串、数字、JSX 或 null/undefined 作为子元素 */}
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            再试一次
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
{
  console.error();
}
