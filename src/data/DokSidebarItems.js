import { AiFillDashboard } from "react-icons/ai";
import { BsFileEarmarkMedicalFill, BsCalendar3 } from "react-icons/bs"

const DokSidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <AiFillDashboard />,
    link: "/home",
  },
  {
    id: 2,
    name: "Rekam Medis",
    icon: <BsFileEarmarkMedicalFill />,
    link: "/rekam-medis" 
  },
  {
    id: 3, 
    name: "Jadwal Operasi",
    icon: <BsCalendar3/>,
    link: "/jadwal"
  }
];

export default DokSidebarItems;
