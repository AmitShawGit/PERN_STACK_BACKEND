import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilUserPlus,
  cilNotes,
  cilPuzzle,cilCouch,
  cilSpeedometer,
  cilStar,cilHappy
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/auth/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'User Management',
  },
  {
    component: CNavItem,
    name: 'Add User',
    to: '/auth/theme/add-user',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'View User',
    to: '/auth/theme/view-user',
    icon: <CIcon icon={cilHappy} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Assignment',
  },
  {
    component: CNavGroup,
    name: 'Assignment',
    to: '/auth/assignment',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Assignment',
        to: '/auth/assignment/view-assignment',
      },
      {
        component: CNavItem,
        name: 'Add Assignment',
        to: '/auth/assignment/add-assignment',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Payments',
    to: '/payments',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Payments',
        to: '/auth/po/purchase-order',
      },

    ],
  },
  {
    component: CNavTitle,
    name: 'Pdf',
  },
  {
    component: CNavGroup,
    name: 'Free Pdf',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Free Pdf',
        to: '/auth/pdf/addpdf',
      },
      {
        component: CNavItem,
        name: 'View Free Pdf',
        to: '/auth/pdf/viewpdf',
      },

    ],
  },

  {
    component: CNavTitle,
    name: 'Reviews',
  },
  {
    component: CNavGroup,
    name: 'Reviews',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Review',
        to: '/auth/add-review',
      },
      {
        component: CNavItem,
        name: 'View Review',
        to: '/auth/view-review',
      },


    ],
  },
  {
    component: CNavTitle,
    name: 'Others',
  },
  {
    component: CNavGroup,
    name: 'Others',
    icon: <CIcon icon={cilCouch} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Callback Request',
        to: '/auth/view-call-back',
      },
      {
        component: CNavItem,
        name: 'Newsletter Request',
        to: '/auth/theme/newsletter',
        
      },
      {
        component: CNavItem,
        name: 'View Query',
        to: '/auth/theme/view-query',

      },
      {
        component: CNavItem,
        name: 'Go to Website',
        to: 'https://mayankstudypoint.com/',
      },

    ],
  },


]

export default _nav
