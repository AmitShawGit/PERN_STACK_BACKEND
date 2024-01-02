import React from 'react';
// import Dashboard from './views/dashboard/Dashboard';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const ViewUser = React.lazy(()=> import('./views/usermanagement/ViewUser'));

const route2 = [
    {
        path:"/",
        exact:true,
        name:"Dashboard",
        element: Dashboard
    },
    {
        path:"/dashboard",
        name:"Dashboard",
        element: Dashboard
    },
    {
        path:"/theme/view-user",
        name:"View Users",
        element: ViewUser
    },
]

export default route2;