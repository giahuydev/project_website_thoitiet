// src/pages/AdminPage.jsx
import { useState } from "react";
import {
  Users,
  MapPin,
  Navigation,
  Mail,
  Crown,
  Activity,
  TrendingUp,
  DollarSign,
  Settings,
  Search,
  Download,
  Filter,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      icon: Users,
      label: "Tổng người dùng",
      value: "12,453",
      change: "+12%",
      color: "blue",
    },
    {
      icon: Crown,
      label: "Premium Users",
      value: "2,847",
      change: "+28%",
      color: "yellow",
    },
    {
      icon: Activity,
      label: "Hoạt động hôm nay",
      value: "8,921",
      change: "+5%",
      color: "green",
    },
    {
      icon: DollarSign,
      label: "Doanh thu tháng",
      value: "567M",
      change: "+18%",
      color: "emerald",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      type: "Premium",
      date: "2024-12-21",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      type: "Free",
      date: "2024-12-20",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      type: "Premium",
      date: "2024-12-20",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      type: "Free",
      date: "2024-12-19",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      type: "Premium",
      date: "2024-12-19",
    },
  ];

  const savedLocations = [
    { id: 1, location: "Hà Nội", users: 3421, saves: 8234 },
    { id: 2, location: "TP. Hồ Chí Minh", users: 5678, saves: 12456 },
    { id: 3, location: "Đà Nẵng", users: 2134, saves: 5432 },
    { id: 4, location: "Đà Lạt", users: 1876, saves: 4321 },
  ];

  const journeyStats = [
    { id: 1, route: "Hà Nội → Đà Nẵng", count: 423, avgTime: "14h 20m" },
    { id: 2, route: "Sài Gòn → Nha Trang", count: 356, avgTime: "8h 30m" },
    { id: 3, route: "Hà Nội → Sapa", count: 278, avgTime: "5h 45m" },
  ];

  const emailNotifications = [
    { id: 1, type: "Cảnh báo thời tiết", sent: 1245, success: 1198 },
    { id: 2, type: "Nhắc lịch hoạt động", sent: 892, success: 874 },
    { id: 3, type: "Thông báo Premium", sent: 456, success: 432 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Settings className="text-blue-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quản lý hệ thống WeatherApp
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-96">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm người dùng, địa điểm..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}
                  >
                    <Icon
                      className={`text-${stat.color}-600 dark:text-${stat.color}-400`}
                      size={24}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      stat.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6">
            <nav className="flex gap-4 overflow-x-auto">
              {[
                { id: "overview", label: "Tổng quan", icon: Activity },
                { id: "users", label: "Người dùng", icon: Users },
                { id: "locations", label: "Địa điểm", icon: MapPin },
                { id: "journeys", label: "Hành trình", icon: Navigation },
                { id: "notifications", label: "Email", icon: Mail },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Biểu đồ truy cập
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {[65, 85, 45, 92, 75, 88, 95].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>T2</span>
                      <span>T3</span>
                      <span>T4</span>
                      <span>T5</span>
                      <span>T6</span>
                      <span>T7</span>
                      <span>CN</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Tỷ lệ chuyển đổi Premium
                    </h3>
                    <div className="flex items-center justify-center h-48">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="16"
                            fill="none"
                            strokeDasharray="502"
                            strokeDashoffset="125"
                            className="text-emerald-500"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            22.8%
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Conversion
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Người dùng gần đây
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2">
                      <Filter size={16} />
                      Lọc
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2">
                      <Download size={16} />
                      Xuất Excel
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                          ID
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                          Họ tên
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                          Loại
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                          Ngày đăng ký
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                            #{user.id}
                          </td>
                          <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {user.email}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                user.type === "Premium"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {user.type}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {user.date}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium">
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Locations Tab */}
            {activeTab === "locations" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Địa điểm được lưu nhiều nhất
                </h3>

                <div className="space-y-4">
                  {savedLocations.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center font-bold text-gray-900 dark:text-white">
                          #{i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {item.location}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.users.toLocaleString()} người dùng
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-500">
                          {item.saves.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          lượt lưu
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Journeys Tab */}
            {activeTab === "journeys" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Hành trình phổ biến
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {journeyStats.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {item.route}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Thời gian TB: {item.avgTime}
                          </p>
                        </div>
                        <Navigation className="text-emerald-500" size={24} />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          {item.count}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          lượt tạo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Thống kê Email Notification
                </h3>

                <div className="space-y-4">
                  {emailNotifications.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Mail className="text-blue-500" size={24} />
                          <p className="font-bold text-gray-900 dark:text-white">
                            {item.type}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-green-500">
                          {((item.success / item.sent) * 100).toFixed(1)}% thành
                          công
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Đã gửi
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {item.sent.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Thành công
                          </p>
                          <p className="text-2xl font-bold text-green-500">
                            {item.success.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                          style={{
                            width: `${(item.success / item.sent) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
