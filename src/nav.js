import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilDescription,
  cilDrop,
  cilFlagAlt,
  cilNotes,
  cilEnvelopeClosed,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
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
    to: '/theme/add-user',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'View User',
    to: '/theme/view-user',
    icon: <CIcon icon={cilFlagAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Newsletter Request',
    to: '/theme/newsletter',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Assignment',
  },
  {
    component: CNavGroup,
    name: 'Assignment',
    to: '/assignment',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Assignment',
        to: '/assignment/view-assignment',
      },
      {
        component: CNavItem,
        name: 'Add Assignment',
        to: '/assignment/add-assignment',
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
        to: '/po/purchase-order',
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
        to: '/pdf/addpdf',
      },
      {
        component: CNavItem,
        name: 'View Free Pdf',
        to: '/pdf/viewpdf',
      },
      
    ],
  },

 
 
 
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Reviews',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },

      
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
