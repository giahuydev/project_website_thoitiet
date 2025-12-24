// src/pages/SavedPage.jsx
import { useState } from "react";
import { Bookmark, MapPin, Navigation, Trash2, Star } from "lucide-react";
import PremiumBanner from "../components/PremiumBanner";

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      type: "location",
      name: "Hà Nội",
      temp: "28°C",
      saved: "2 ngày trước",
      starred: false,
    },
    {
      id: 2,
      type: "route",
      name: "Hà Nội → Đà Nẵng",
      distance: "760km",
      saved: "5 ngày trước",
      starred: false,
    },
    {
      id: 3,
      type: "location",
      name: "Đà Lạt",
      temp: "18°C",
      saved: "1 tuần trước",
      starred: true,
    },
    {
      id: 4,
      type: "route",
      name: "Sài Gòn → Nha Trang",
      distance: "450km",
      saved: "1 tuần trước",
      starred: false,
    },
    {
      id: 5,
      type: "location",
      name: "Phú Quốc",
      temp: "30°C",
      saved: "2 tuần trước",
      starred: false,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  const handleToggleStar = (id) => {
    setSavedItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa mục này?")) {
      setSavedItems((items) => items.filter((item) => item.id !== id));
    }
  };

  const handleViewDetails = (item) => {
    console.log("Viewing details for:", item);
    alert(`Xem chi tiết: ${item.name}`);
  };

  const filteredItems = savedItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "location") return item.type === "location";
    if (activeFilter === "route") return item.type === "route";
    return true;
  });

  const locationCount = savedItems.filter(
    (item) => item.type === "location"
  ).length;
  const routeCount = savedItems.filter((item) => item.type === "route").length;
  const starredCount = savedItems.filter((item) => item.starred).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Đã lưu
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Quản lý các địa điểm và lộ trình yêu thích
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Tất cả ({savedItems.length})
              </button>
              <button
                onClick={() => setActiveFilter("location")}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeFilter === "location"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Địa điểm ({locationCount})
              </button>
              <button
                onClick={() => setActiveFilter("route")}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeFilter === "route"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Hành trình ({routeCount})
              </button>
            </div>

            {/* Saved Items Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center">
                      {item.type === "location" && (
                        <MapPin className="text-emerald-600" size={24} />
                      )}
                      {item.type === "route" && (
                        <Navigation className="text-cyan-600" size={24} />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleStar(item.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Star
                          className={
                            item.starred
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-yellow-500"
                          }
                          size={18}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="text-red-500" size={18} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {item.temp || item.distance}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.saved}
                    </span>
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Không có mục nào được lưu
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Premium Tip */}
              <PremiumBanner />

              {/* Statistics */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Thống kê
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <MapPin className="text-blue-500" size={20} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Địa điểm
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {locationCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                        <Navigation className="text-emerald-500" size={20} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Hành trình
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {routeCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                        <Star className="text-yellow-500" size={20} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Yêu thích
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {starredCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Tip */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">
                      Mẹo hay
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Nhấn vào biểu tượng ⭐ để đánh dấu địa điểm quan trọng
                    </p>
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
