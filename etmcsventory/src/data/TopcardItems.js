import {
  FaUsers,
  FaCartPlus,
  FaPeopleCarry,
  FaTrash,
  FaChartPie,
} from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsCartX } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { PiInvoiceBold } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { IoBagSharp, IoPricetagsSharp } from "react-icons/io5";
import { HiMiniReceiptRefund } from "react-icons/hi2";

// Sales Invoice
// Suppliers
// Purchase Invoice
// Items
// Items Category
// Return Items
// Expenses

export const TopCardItemList = [
  {
    title: "Customer",
    count: "0",
    icon: <IoIosPeople />,
    bg: "#2563eb",
    url: "/customers",
  },
  {
    title: "Sales Invoice",
    count: "0",
    icon: <PiInvoiceBold />,
    bg: "#16a34a",
    url: "/sales",
  },
  {
    title: "Suppliers",
    count: "0",
    icon: <FaPeopleCarry />,
    bg: "#2563eb",
    url: "/suppliers",
  },
  {
    title: "Purchase Invoice",
    count: "0",
    icon: <PiInvoiceBold />,
    bg: "#16a34a",
    url: "/purchase",
  },
  {
    title: "Items",
    count: "0",
    icon: <IoBagSharp />,
    bg: "#16a34a",
    url: "/products",
  },

  {
    title: "Items Category",
    count: "0",
    icon: <IoPricetagsSharp />,
    bg: "#2563eb",
    url: "/categories",
  },
  {
    title: "Return Items",
    count: "0",
    icon: <HiMiniReceiptRefund />,
    bg: "#f59e0b",
    url: "/sale-return",
  },
  {
    title: "Expenses",
    count: "0",
    icon: <FaChartPie />,
    bg: "#ef4444",
    url: "/expenses",
  },
];
