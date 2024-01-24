import React from 'react';
// import Dashboard from './views/dashboard/Dashboard';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const ViewUser = React.lazy(()=> import('./views/usermanagement/ViewUser'));
const AddUser = React.lazy(()=> import('./views/usermanagement/AddUser'));
const NewsLetter = React.lazy(()=>import('./views/usermanagement/NewsLetter'));

//Assignment
const AddAssignment = React.lazy(()=>import('./views/Assignment/AddAssignment'));
const ViewAssignment = React.lazy(()=>import('./views/Assignment/ViewAssignment'));

//Payments
const Payment =React.lazy(()=>import('./views/PO/PurchaseOrder'))
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
    {
        path:"/theme/newsletter",
        name:"Newsletter",
        element: NewsLetter
    },
    {
        path:"/assignment/add-assignment",
        name:"Add Assignment",
        element: AddAssignment
    },
    {
        path:"/assignment/view-assignment",
        name:"View Assignment",
        element: ViewAssignment
    },
    {
        path:"/po/purchase-order",
        name:"View Payment",
        element: Payment
    },
]

export default route2;