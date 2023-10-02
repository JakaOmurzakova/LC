import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPageMain from "./pages/LoginPageMain";
import RoomPage from "./pages/RoomPage";
import MainLayout from "./MainLayout";

const MainRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/auth" element={<LoginPageMain />} />
        <Route path="/room" element={<RoomPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
