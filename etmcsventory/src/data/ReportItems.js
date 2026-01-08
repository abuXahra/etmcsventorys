import {
  FaPeopleCarry,
  FaTrash,
  FaChartPie,
  FaOpencart,
  FaRegMoneyBillAlt,
  FaRecycle,
} from "react-icons/fa";
import { PiInvoiceBold } from "react-icons/pi";
import { IoBagSharp, IoPricetagsSharp } from "react-icons/io5";
import { BiShoppingBag } from "react-icons/bi";
import { RiBarChartGroupedFill } from "react-icons/ri";

export const ReportItemList = [
  {
    title: "Sales Report",
    icon: <FaOpencart />,
    bg: "#16a34a",
    url: "/sales-report",
  },
  {
    title: "Sales Payment Report",
    icon: <FaRegMoneyBillAlt />,
    bg: "#16a34a",
    url: "/sale-payment-report",
  },
  {
    title: "Purchase Report",
    icon: <FaPeopleCarry />,
    bg: "#2563eb",
    url: "/purchase-report",
  },
  {
    title: "Purchase Payment Report",
    icon: <FaRegMoneyBillAlt />,
    bg: "#2563eb",
    url: "/purchase-payment-report",
  },
  {
    title: "Daily Sale Report",
    icon: <FaOpencart />,
    bg: "purple",
    url: "/daily-report",
  },
  {
    title: "Items Sales Report",
    icon: <RiBarChartGroupedFill />,
    bg: "purple",
    url: "/item-sales-report",
  },
  {
    title: "Expenses Report",
    icon: <FaChartPie />,
    bg: "#ef4444",
    url: "/expense-report",
  },
  {
    title: "Wastage Report",
    icon: <FaRecycle />,
    bg: "#ef4444",
    url: "/wastage-report",
  },
  {
    title: "Stock Report",
    icon: <BiShoppingBag />,
    bg: "#f59e0b",
    url: "/stock-report",
  },
];
