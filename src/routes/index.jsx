import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useSelector } from "react-redux";
import PrivateRoute from "../components/PrivateRoute";
import { Login, Dashboard, NotFound } from "../pages";

export default function index() {
  const { isLoggedIn } = (state) => state.user;
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
