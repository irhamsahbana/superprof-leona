import { Routes, Route } from "react-router-dom";
// components
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import {
  Login,
  Dashboard,
  NotFound,
  ViewDokter,
  JadwalOperasi,
} from "../pages";

function Routing() {
  return (
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
          path="/dokter"
          element={
            <PrivateRoute>
              <ViewDokter />
            </PrivateRoute>
          }
        />

        <Route
          path="/jadwal"
          element={
            <PrivateRoute>
              <JadwalOperasi />
            </PrivateRoute>
          }
        >
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MainLayout>
  );
}

export { Routing };
