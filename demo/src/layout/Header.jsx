// src/layout/Header.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { API_SOURCES } from "../constants";

// 1. IMPORT USEAUTH
import { useAuth } from "../context/AuthContext";

export default function Header({
  onToggleSidebar,
  apiSource,
  setApiSource,
  isDarkMode,
  setIsDarkMode,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 2. LẤY TRẠNG THÁI TỪ AUTH CONTEXT
  const { isAuthenticated, user, logout } = useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/"); // Quay về trang chủ sau khi logout
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* LEFT - Menu Button + Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onToggleSidebar}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-900 dark:text-white"
              >
                <span className="text-2xl">☰</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="hidden sm:flex items-center gap-2"
              >
                <span className="text-2xl">☁️</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  WeatherWeb
                </span>
              </button>
            </div>

            {/* CENTER - Navigation (Giữ nguyên) */}
            <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-3xl">
               {/* ... (Code phần menu giữ nguyên như cũ) ... */}
               {/* Tôi rút gọn đoạn này để bạn dễ nhìn, hãy giữ nguyên code cũ của bạn ở đây */}
               <select
                value={apiSource}
                onChange={(e) => setApiSource(e.target.value)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <option value={API_SOURCES.SPRING_BOOT_OPENMETEO}>
                  Nguồn: BE
                </option>
              </select>
               <button onClick={() => navigate("/")} className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${isActive("/") ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>Thời tiết</button>
               <button onClick={() => navigate("/schedule")} className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${isActive("/schedule") ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>Lịch hoạt động</button>
               <button onClick={() => navigate("/journey")} className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${isActive("/journey") ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>Hành trình</button>
               <button onClick={() => navigate("/saved")} className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${isActive("/saved") ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>Đã lưu</button>
            </nav>

            {/* RIGHT - Dark Mode + Auth */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                title={isDarkMode ? "Chế độ sáng" : "Chế độ tối"}
              >
                <span className="text-2xl">{isDarkMode ? "☀️" : "🌙"}</span>
              </button>

              {/* 3. XỬ LÝ LOGIC HIỂN THỊ Ở ĐÂY */}
              {isAuthenticated ? (
                // --- TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP ---
                <div className="flex items-center gap-3 ml-2">
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {/* Lấy ký tự đầu của tên, hoặc mặc định là U */}
                      {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user?.username || "User"}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                // --- TRƯỜNG HỢP CHƯA ĐĂNG NHẬP ---
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="hidden md:block px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium transition whitespace-nowrap"
                  >
                    Đăng nhập
                  </button>

                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition whitespace-nowrap"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login/Register Modals */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSwitchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}
      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onSwitchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </>
  );
}