// components/layout/DashboardLayout.jsx
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Content, MainContent } from "./Home.style";
import HideSidebar from "../../components/hide/hide-sidebar/HideSidebar";
import Siderbar from "../../components/sidebar/Siderbar";
import HiderHeader from "../../components/hide/Hider-header/HiderHeader";
import HeaderDashboard from "../../components/header/HeaderDashboard";
import { UserContext } from "../../components/context/UserContext";


export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);


  return (
    <Content>
      <HideSidebar>
        <Siderbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </HideSidebar>

      <MainContent sidebarOpen={sidebarOpen}>
        <HiderHeader>
          <HeaderDashboard toggleSidebar={toggleSidebar} />
        </HiderHeader>
        {children}
      </MainContent>
    </Content>
  );
}
