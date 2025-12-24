import { useState, useEffect } from "react";
import { Bookmark, MapPin, Navigation, Trash2, Star, Loader } from "lucide-react";
import PremiumBanner from "../components/PremiumBanner";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SavedPage() {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch dữ liệu từ Backend khi load trang
  useEffect(() => {
    if (user?.idNguoiDung) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.favorites.getByUserId(user.idNguoiDung);
      if (response.result) {
        // Map dữ liệu từ Backend sang format của Frontend
        const mappedItems = response.result.map(item => ({
          id: item.idDiaDiem, // Giả sử BE trả về idDiaDiem
          type: "location", // Mặc định là location (hoặc logic phân loại từ BE)
          name: item.tenDiaDiem || "Địa điểm đã lưu",
          temp: "--°C", // Cần gọi thêm API thời tiết nếu muốn hiển thị nhiệt độ real-time
          saved: new Date(item.thoiGianTao).toLocaleDateString('vi-VN'),
          starred: true, // Mặc định là true vì đã lưu
        }));
        setSavedItems(mappedItems);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách yêu thích:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa mục này?")) {
      try {
        await api.favorites.delete(id);
        setSavedItems((items) => items.filter((item) => item.id !== id));
      } catch (error) {
        alert("Xóa thất bại: " + error.message);
      }
    }
  };

  // Logic lọc (Frontend)
  const filteredItems = savedItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const locationCount = savedItems.filter(i => i.type === "location").length;
  const routeCount = savedItems.filter(i => i.type === "route").length;

  if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

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
                Quản lý các địa điểm và lộ trình yêu thích của {user?.hoTen}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['all', 'location', 'route'].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all capitalize ${
                    activeFilter === type
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {type === 'all' ? 'Tất cả' : type === 'location' ? 'Địa điểm' : 'Hành trình'}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center">
                      {item.type === "location" ? <MapPin className="text-emerald-600" size={24} /> : <Navigation className="text-cyan-600" size={24} />}
                    </div>
                    <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.temp}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-500">Đã lưu: {item.saved}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-gray-500">Chưa có mục nào được lưu.</div>
            )}
          </div>

          {/* Sidebar (Thống kê) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <PremiumBanner />
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Thống kê</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Địa điểm</span>
                    <span className="font-bold text-gray-900 dark:text-white">{locationCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Hành trình</span>
                    <span className="font-bold text-gray-900 dark:text-white">{routeCount}</span>
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