export { default as Login } from "./Login";
export { default as NotFound } from "./NotFound";
export { default as Dashboard } from "./Dashboard";

// master - dokter
export { default as ViewDokter } from "./Master/Dokter";
export { default as EditDokter } from "./Master/Dokter/edit";
export { default as AddDokter } from "./Master/Dokter/add";

// master - studio
export { default as ViewStudio } from "./Master/Studio";

// master - patients
export { default as ViewPasien } from "./Master/Pasien";

// master - tindakan
export { default as ViewTindakan } from "./Master/Tindakan";

// master - jenis tindakan
export { default as ViewJenisTindakan } from "./Master/JenisTindakan";

// jadwal operasional
export { default as JadwalOperasi } from "./JadwalOperasi";
export { default as AddJadwal } from "./JadwalOperasi/add";

// history 
export {default as History} from "./History";
export {default as HistorySelected} from "./History/HistorySelected";

// rekam medis
export {default as RekamMedis} from "./RekamMedis";
export {default as SearchRekamMedis} from "./RekamMedis/SearchRekamMedis"
export {default as CurrentRekamMedis} from "./RekamMedis/CurrentRekamMedis"

// odontogram
export {default as Odontogram } from "./Odontogram";

// pembayaran
export { default as Kasir } from "./Kasir";
export { default as Invoice } from "./Kasir/Invoice";
export { default as ProsesInvoice } from "./Kasir/ProsesInvoice";
export { default as EditInvoice } from "./Kasir/EditInvoice";
export { default as Pembayaran } from "./Pembayaran";

// pages for role = doctor
export { default as DokDashboard } from "./DokDashboard";
