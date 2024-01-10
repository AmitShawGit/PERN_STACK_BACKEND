import React from 'react';
// import Dashboard from './views/dashboard/Dashboard';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const ViewUser = React.lazy(()=> import('./views/usermanagement/ViewUser'));
const AddUser = React.lazy(()=> import('./views/usermanagement/AddUser'))
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
        name:"View Query",
        element: ViewUser
    },
    {
        path:"/theme/add-user",
        name:"Add Users",
        element: AddUser
    },
]

export default route2;