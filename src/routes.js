import React from 'react';
const Index = React.lazy(() => import('./dashboard/pages/dashboard/Index'));
const company=React.lazy(()=>import('./dashboard/pages/company/Company'));
const groups=React.lazy(()=>import('./dashboard/pages/Group/Groups'))
const routes = [
  // { path: '/', exact: true, name: 'Home', },
  { path: '/dashboardhome/dashboard', name: 'dashboardhome', element: Index }, 
  //Company
  { path: '/dashboardhome/company', name: 'company', element: company },
  //Groups
  { path: '/dashboardhome/groups', name: 'company', element: groups },
]
export default routes