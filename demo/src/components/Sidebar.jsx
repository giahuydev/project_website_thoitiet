// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-3xl">☁️</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                WeatherWeb
              </span>
            </div>
            <button
              onClick={toggleSidebar}
              className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              ✕
            </button>
          </div>

          {/* Premium Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👑</span>
              <span className="font-bold text-gray-900 dark:text-white">
                Nâng cấp Premium
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Tra cứu không giới hạn & nhận email hàng ngày
            </p>
            <button
              onClick={() => handleNavigate("/premium")}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Xem gói Premium
            </button>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <button
              onClick={() => handleNavigate("/")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">🌤️</span>
              <span className="font-medium">Thời tiết</span>
            </button>

            <button
              onClick={() => handleNavigate("/wind")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">💨</span>
              <span className="font-medium">Bản đồ gió</span>
            </button>

            <button
              onClick={() => handleNavigate("/schedule")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">📅</span>
              <span className="font-medium">Lịch hoạt động</span>
            </button>

            <button
              onClick={() => handleNavigate("/journey")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">🗺️</span>
              <span className="font-medium">Hành trình</span>
            </button>

            <button
              onClick={() => handleNavigate("/community")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">👥</span>
              <span className="font-medium">Cộng đồng</span>
            </button>

            <button
              onClick={() => handleNavigate("/saved")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">⭐</span>
              <span className="font-medium">Đã lưu</span>
            </button>

            <button
              onClick={() => handleNavigate("/profile")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">👤</span>
              <span className="font-medium">Hồ sơ</span>
            </button>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              © 2024 WeatherApp
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
