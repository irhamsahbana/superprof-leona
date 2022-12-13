import { Routes, Route } from "react-router-dom";
// components
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import {
  Login,
  Dashboard,
  NotFound,
  ViewDokter,
  AddJadwal,
  JadwalOperasi,
  History,
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
        />
        <Route
          path="/jadwal/add"
          element={
            <PrivateRoute>
              <AddJadwal />
            </PrivateRoute>
          }
        />

        <Route
          path="/history-transaksi"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        
        {/* TODO: change to nested; add id */}
        <Route
          path="/history-transaksi/selected"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export { Routing };
