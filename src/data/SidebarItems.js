import { AiFillDashboard } from "react-icons/ai";
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiData } from "react-icons/bi";
import { BsFileEarmarkMedicalFill, BsCalendar3 } from "react-icons/bs"

const SidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <AiFillDashboard />,
    link: "/",
  },
  {
    id: 2,
    name: "Master Data",
    icon: <MdOutlineSpaceDashboard />,
    link: "/view-dokter",
    dropdown: true,
    dropdownItems: [
      {
        name: "Dokter",
        link: "/dokter",
      },
      {
        name: "Pasien",
        link: "/pasien",
      },
      {
        name: "Studio",
        link: "/studio",
      },
      {
        name: "User",
        link: "/user",
      },
      {
        name: "Tindakan",
        link: "/tindakan",
      },
      {
        name: "Jenis Tindakan",
        link: "/jenis-tindakan",
      },
    ],
  },
  {
    id: 3,
    name: "Data Transaksi",
    icon: <BiData />,
    link: "/history-transaksi",
  },
  {
    id: 4,
    name: "Rekam Medis",
    icon: <BsFileEarmarkMedicalFill />,
    link: "/rekam-medis" 
  },
  {
    id: 5, 
    name: "Jadwal Operasi",
    icon: <BsCalendar3/>,
    link: "/jadwal"
  },
  {
    id: 6,
    name: "Kasir",
    icon: <FaCashRegister />,
    link: "/kasir",
  },
];

export default SidebarItems;
