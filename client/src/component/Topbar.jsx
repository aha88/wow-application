import React, { useState } from 'react'
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from '@coreui/react'

export const Topbar = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CNavbar expand="lg" className="bg-body-tertiary">
        <CContainer fluid>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="#" active>Dashboard</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Event Listing</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Event Attendance</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Report</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Certificate</CNavLink>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}
