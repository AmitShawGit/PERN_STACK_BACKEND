import React from 'react';

// import Dashboard from './views/dashboard/Dashboard';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AddUser = React.lazy(() => import('./views/usermanagement/AddUser'));
const ViewUser = React.lazy(() => import('./views/usermanagement/ViewUser'));

//Assignment
const AddAssignment = React.lazy(() => import('./views/Assignment/AddAssignment'));
const ViewAssignment = React.lazy(() => import('./views/Assignment/ViewAssignment'));

//Payments
const Payment = React.lazy(() => import('./views/PO/PurchaseOrder'))


//PDF
const AddFreePdf = React.lazy(() => import('./views/Freepdf/AddFreePdf'));
const ViewFreePdf = React.lazy(() => import('./views/Freepdf/ViewFreePdf'));


//Review
const AddReview = React.lazy(() => import('./views/Reviews/AddReview'));
const ViewReview = React.lazy(() => import('./views/Reviews/ViewReview'));

//Others
const ViewCallBack = React.lazy(() => import('./views/Others/ViewCallBack'));
const NewsLetter = React.lazy(() => import('./views/usermanagement/NewsLetter'));
const ViewQuery = React.lazy(() => import('./views/usermanagement/ViewQuery'));


const route2 = [
    {
        path: "/",
        exact: true,
        name: "Dashboard",
        element: Dashboard
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        element: Dashboard
    },
    {
        path: "/theme/view-user",
        name: "View User",
        element: ViewUser
    },
    {
        path: "/theme/add-user",
        name: "Add Users",
        element: AddUser
    },
    {
        path: "/theme/newsletter",
        name: "Newsletter",
        element: NewsLetter
    },
    {
        path: "/assignment/add-assignment",
        name: "Add Assignment",
        element: AddAssignment
    },
    {
        path: "/assignment/view-assignment",
        name: "View Assignment",
        element: ViewAssignment
    },
    {
        path: "/po/purchase-order",
        name: "View Payment",
        element: Payment
    },
    {
        path: "/pdf/addpdf",
        name: "Add Free Pdf",
        element: AddFreePdf
    },
    {
        path: "/pdf/viewpdf",
        name: "View Free Pdf",
        element: ViewFreePdf
    },
    {
        path: "/view-review",
        name: "View Review",
        element: ViewReview
    },
    {
        path: "/add-review",
        name: "Add Review",
        element: AddReview
    },
    {
        path: "/view-call-back",
        name: "View Call Back",
        element: ViewCallBack
    },
    {
        path: "/theme/view-query",
        name: "View Query",
        element: ViewQuery
    },
]

export default route2;