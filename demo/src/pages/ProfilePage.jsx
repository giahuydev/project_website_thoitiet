// src/pages/ProfilePage.jsx
import { useNavigate } from "react-router-dom";
import {
  User,
  MapPin,
  Navigation,
  Settings,
  Mail,
  Bell,
  Shield,
} from "lucide-react";
import PremiumBanner from "../components/PremiumBanner";

export default function ProfilePage() {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      icon: User,
      title: "Thông tin cá nhân",
      description: "Cập nhật tên, số điện thoại",
      path: "/profile/personal-info",
    },
    {
      icon: Mail,
      title: "Email & Thông báo",
      description: "Quản lý email thông báo",
      path: "/profile/email-notification",
    },
    {
      icon: Shield,
      title: "Bảo mật",
      description: "Đổi mật khẩu, xác thực 2 bước",
      path: "/profile/security",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
                  <User size={48} className="text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">Nguyễn Văn A</h1>
                  <p className="text-white/80">0901 234 567</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full">
                    👑 Pro Member
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: MapPin,
                  label: "Địa điểm đã lưu",
                  value: "12",
                  color: "blue",
                },
                {
                  icon: Navigation,
                  label: "Hành trình",
                  value: "8",
                  color: "emerald",
                },
                {
                  icon: Bell,
                  label: "Thông báo",
                  value: "24",
                  color: "yellow",
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <Icon className={`text-${stat.color}-500 mb-4`} size={32} />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Account Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Cài đặt tài khoản
              </h2>

              <div className="space-y-4">
                {settingsOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.path}
                      onClick={() => navigate(option.path)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className="text-gray-600 dark:text-gray-400"
                          size={20}
                        />
                        <div className="text-left">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {option.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Premium Tip */}
              <PremiumBanner />

              {/* Membership Info */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">👑</span>
                  <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                    Pro Member
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Gói hiện tại
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      Premium
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Hết hạn
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      31/12/2024
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tự động gia hạn
                    </span>
                    <span className="font-bold text-green-500">✓ Bật</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/premium")}
                  className="w-full py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  Quản lý gói
                </button>
              </div>

              {/* Activity Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Hoạt động gần đây
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Lưu địa điểm mới
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      2h trước
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Tạo hành trình
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      1 ngày
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Cập nhật hồ sơ
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      3 ngày
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
