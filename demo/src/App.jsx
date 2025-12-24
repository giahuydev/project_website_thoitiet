// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./components/Sidebar";
import WeatherPage from "./pages/WeatherPage";
import JourneyPage from "./pages/JourneyPage";
import SchedulePage from "./pages/SchedulePage";
import SavedPage from "./pages/SavedPage";
import ProfilePage from "./pages/ProfilePage";
import WindPage from "./pages/WindPage";
import CommunityPage from "./pages/CommunityPage";
import PremiumPage from "./pages/PremiumPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import AdminPage from "./pages/AdminPage";

// Profile sub-pages
import { PersonalInfoPage } from "./pages/profile/PersonalInfoPage";
import { EmailNotificationPage } from "./pages/profile/EmailNotificationPage";
import { SecurityPage } from "./pages/profile/SecurityPage";

import { API_SOURCES } from "./constants";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [apiSource, setApiSource] = useState(API_SOURCES.SPRING_BOOT_OPENMETEO);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      {/* HEADER */}
      <Header
        onToggleSidebar={toggleSidebar}
        apiSource={apiSource}
        setApiSource={setApiSource}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* MAIN CONTENT */}
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<WeatherPage apiSource={apiSource} />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/personal-info" element={<PersonalInfoPage />} />
          <Route
            path="/profile/email-notification"
            element={<EmailNotificationPage />}
          />
          <Route path="/profile/security" element={<SecurityPage />} />
          <Route path="/wind" element={<WindPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </>
  );
}
