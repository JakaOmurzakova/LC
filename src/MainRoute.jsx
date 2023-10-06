import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPageMain from "./pages/LoginPageMain";
import RoomPage from "./pages/RoomPage";
import MainLayout from "./layouts/MainLayout";
import SecondLayout from "./layouts/SecondLayout";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";

const MainRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<SecondLayout />}>
        <Route path="/room" element={<RoomPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
