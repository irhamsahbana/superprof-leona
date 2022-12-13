import { BrowserRouter, Routes, Route } from "react-router-dom";
// components
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import { Login, Dashboard, NotFound, ViewDokter } from "../pages";

export default function index() {
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

          <Route
            path="/view-dokter"
            element={
              <PrivateRoute>
                <ViewDokter />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
