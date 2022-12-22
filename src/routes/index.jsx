import { Routes, Route } from "react-router-dom";
// components
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import { useSelector } from "react-redux";
import {
  Login,
  Dashboard,
  NotFound,
  ViewDokter,
  AddDokter,
  AddJadwal,
  ViewStudio,
  ViewTindakan,
  JadwalOperasi,
  History,
  HistorySelected,
  SearchRekamMedis,
  RekamMedis,
  CurrentRekamMedis,
  Odontogram,
  Kasir,
  Invoice,
  ProsesInvoice,
  EditInvoice,
  Pembayaran,
  DokDashboard
} from "../pages";

function Routing() {
  const { role } = useSelector((state) => state.user);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              {role.role === "admin" ? <Dashboard /> : <DokDashboard/>}
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
          path="/dokter/add"
          element={
            <PrivateRoute>
              <AddDokter />
            </PrivateRoute>
          }
        />
        <Route
          path="/studio"
          element={
            <PrivateRoute>
              <ViewStudio />
            </PrivateRoute>
          }
        />

        <Route
          path="/tindakan"
          element={
            <PrivateRoute>
              <ViewTindakan />
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
              <HistorySelected />
            </PrivateRoute>
          }
        />
        <Route
          path="/rekam-medis"
          element={
            <PrivateRoute>
              <RekamMedis />
            </PrivateRoute>
          }
        />
        <Route
          path="/rekam-medis/search"
          element={
            <PrivateRoute>
              <SearchRekamMedis />
            </PrivateRoute>
          }
        />
        <Route
          path="/rekam-medis/selected"
          element={
            <PrivateRoute>
              <CurrentRekamMedis />
            </PrivateRoute>
          }
        />
        <Route
          path="/odontogram"
          element={
            <PrivateRoute>
              <Odontogram />
            </PrivateRoute>
          }
        />

        <Route
          path="/kasir"
          element={
            <PrivateRoute>
              <Kasir />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <PrivateRoute>
              <Invoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/proses-invoice"
          element={
            <PrivateRoute>
              <ProsesInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/ubah-invoice"
          element={
            <PrivateRoute>
              <EditInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/pembayaran"
          element={
            <PrivateRoute>
              <Pembayaran />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export { Routing };
