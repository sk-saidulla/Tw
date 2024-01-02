import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const MenuItem = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboardhome/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: "Company",
  },
  {
    component: CNavGroup,
    name: "Masters",    
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Company",
        to: "/dashboardhome/company",
      },
      {
        component: CNavItem,
        name: "Groups",
        to: "/dashboardhome/groups",
      },
      {
        component: CNavItem,
        name: "Ledgers",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Retire Ledgers",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Vehicle",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Vehicle Type",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Route",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Cost Center",
        to: "/base/breadcrumbs",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Voucher Settings",
    to: "/theme/colors",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Consignment Invoice",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Commision Slip",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Consignment Note",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Consignment Note UnChecked",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Credit Note",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Debit Note",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: `Dual Transaction Payment`,
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Dual Transaction Receipt",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Journal",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Contra",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Payment",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Proforma",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Purchase",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Receipt",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Sales Invoice",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Vehicle Trip",
        to: "/base/breadcrumbs",
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/dashboardhome/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: "Services",
  },
  {
    component: CNavGroup,
    name: "Transaction",
    to: "/base",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: "Account Transaction",
        to: "/base/accordion",
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: "Sales Invoice",
            to: "/dashboardhome/salesinvoice",
          },
          {
            component: CNavItem,
            name: "Proforma Invoice/ Estimate/ Quotation",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Purchase Entry",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Payment Recipt",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Journal Contra",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Dual Transaction",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Debit Note & Credit Note",
            to: "/base/accordion",
          },
        ],
      },
      {
        component: CNavGroup,
        name: "Transportation Transaction",
        to: "/base/accordion",
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: "Programme",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "CN & CS",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Invoice",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Balance Register",
            to: "/base/accordion",
          },
          {
            component: CNavItem,
            name: "Vehicle Trip",
            to: "/base/accordion",
          },
        ],
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Report",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Ledger Report",
        to: "/forms/form-control",
      },
      {
        component: CNavItem,
        name: "Trail Balance",
        to: "/forms/select",
      },
      {
        component: CNavItem,
        name: "Profit $ Loss A/C",
        to: "/forms/checks-radios",
      },
      {
        component: CNavItem,
        name: "Balance Sheet",
        to: "/forms/range",
      },
      {
        component: CNavItem,
        name: "Freight Register",
        to: "/forms/input-group",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Gst",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Download Gstr1",
        to: "/icons/coreui-icons",
      },
      {
        component: CNavItem,
        name: "Gst Services",
        to: "/icons/flags",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "E-Way Bill",
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Generate EwayBill",
        to: "/notifications/alerts",
      },
      {
        component: CNavItem,
        name: "Bill By Date",
        to: "/notifications/badges",
      },
      {
        component: CNavItem,
        name: "Trnsporter By Date",
        to: "/notifications/modals",
      },
      {
        component: CNavItem,
        name: "Transporter By State",
        to: "/notifications/toasts",
      },
    ],
  },

  {
    component: CNavTitle,
    name: "Wallet",
  },
  {
    component: CNavGroup,
    name: "Fund",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Add Fund",
        to: "/login",
      },
      {
        component: CNavItem,
        name: "wallet History",
        to: "/register",
      },
    ],
  },
  {
    component: CNavTitle,
    name: "Invoice Print",
  },
  {
    component: CNavGroup,
    name: "Multi Invoice",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Multiple Invoice Download",
        to: "/login",
      },
    ],
  },
];

export default MenuItem;
