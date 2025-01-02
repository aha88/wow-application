import React from 'react';
import {
  CSidebar,
  CSidebarNav,
  CNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilLayers, cilVector} from '@coreui/icons';
 
export const Sidebar = ({data}) => (
  <CSidebar className="border-end" unfoldable>
    <CSidebarNav>
      <CNavItem href="/dashboard/Dashboard">
        <CIcon customClassName="nav-icon" size='sm' height={50} width={50} icon={cilSpeedometer} /> Dashboard
      </CNavItem>
      <CNavItem href="/companies">
        <CIcon customClassName="nav-icon" size='sm' height={50} width={50} icon={cilVector} /> Companies
      </CNavItem>
      <CNavItem href={`/profile/${data.id}`}>
        <CIcon customClassName="nav-icon" size='sm' height={50} width={50} icon={cilLayers} /> Setting
      </CNavItem>
    </CSidebarNav>
  </CSidebar>
);
