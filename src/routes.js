import React from "react";
const Index = React.lazy(() => import("./dashboard/pages/dashboard/Index"));

//Company
const company = React.lazy(() => import("./dashboard/pages/company/Company"));

//Groups
const groups = React.lazy(() => import("./dashboard/pages/Group/Groups"));
const CreateGroups = React.lazy(
  () => import("./dashboard/pages/Group/CreateGroups")
);

//SalesInvoice
const SalesInvoice = React.lazy(
  () => import("./dashboard/pages/transaction/salesinvoice/SalesInvoice")
);
const CreateSalesInvoice = React.lazy(
  () => import("./dashboard/pages/transaction/salesinvoice/CreateSalesInvoice")
);

const routes = [
  // { path: '/', exact: true, name: 'Home', },
  { path: "/dashboardhome/dashboard", name: "dashboardhome", element: Index },
  //Company
  { path: "/dashboardhome/company", name: "company", element: company },
  //Groups
  { path: "/dashboardhome/groups", name: "groups", element: groups },
  {
    path: "/dashboardhome/groups/creategroups",
    name: "create groups",
    element: CreateGroups,
  },
  //SalesInvoice
  {
    path: "/dashboardhome/salesinvoice",
    name: "salesinvoice",
    element: SalesInvoice,
  },
  {
    path: "/dashboardhome/salesinvoice/createSalesinvoice",
    name: "create salesinvoice",
    element: CreateSalesInvoice,
  },
];
export default routes;
