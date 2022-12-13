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
    link: "/home",
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
        link: "/view-pasien",
      },
      {
        name: "Studio",
        link: "/view-studio",
      },
      {
        name: "User",
        link: "/view-user",
      },
      {
        name: "Tindakan",
        link: "/view-tindakan",
      },
      {
        name: "Jenis Tindakan",
        link: "/view-jenis-tindakan",
      },
    ],
  },
  {
    id: 3,
    name: "Data Transaksi",
    icon: <BiData />,
    link: "",
    dropdown: true,
    dropdownItems: [

        {
          name: "History",
          link: "/history-transaksi"
        },
        {
          name: "Deposit",
          link: "/deposit"
        },
    ]
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
