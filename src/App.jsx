/* eslint-disable no-unused-vars */
import * as React from "react"; // 手动导入 React
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, //这是自动更新数据的时间间隔
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles></GlobalStyles>
        <BrowserRouter>
          <Routes>
            {/* AppLayout是整体的布局，在里面设置子路由 */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard"></Navigate>}
              ></Route>
              <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
              <Route path="bookings" element={<Bookings></Bookings>}></Route>
              <Route
                path="bookings/:bookingId"
                element={<Booking></Booking>}
              ></Route>
              <Route
                path="checkin/:bookingId"
                element={<Checkin></Checkin>}
              ></Route>
              <Route path="cabins" element={<Cabins></Cabins>}></Route>
              <Route path="users" element={<Users></Users>}></Route>
              <Route path="settings" element={<Settings></Settings>}></Route>
              <Route path="account" element={<Account></Account>}></Route>
            </Route>

            <Route path="login" element={<Login></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
