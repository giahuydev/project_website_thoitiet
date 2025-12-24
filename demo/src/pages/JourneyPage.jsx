import { useState } from "react";
import { MapPin, Navigation, Cloud, Droplets, Loader, AlertTriangle } from "lucide-react";
import PremiumBanner from "../components/PremiumBanner";
import api from "../services/api";

export default function JourneyPage() {
  const [startLocation, setStartLocation] = useState("Hanoi");
  const [endLocation, setEndLocation] = useState("Da Nang");
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);
  const [journeyTime, setJourneyTime] = useState("08:00");
  
  const [isSearching, setIsSearching] = useState(false);
  const [routeData, setRouteData] = useState(null); // Data từ API trả về

  const handleSearch = async () => {
    if (!startLocation || !endLocation) return alert("Vui lòng nhập điểm đi/đến");
    
    setIsSearching(true);
    setRouteData(null);

    try {
      // Gọi API phân tích hành trình
      const response = await api.journey.analyze({
        diemDi: startLocation,
        diemDen: endLocation,
        thoiGianKhoiHanh: `${journeyDate}T${journeyTime}:00`
      });

      if (response.result) {
        setRouteData(response.result); // Giả sử result chứa { distance, duration, points... }
      } else {
        throw new Error("Không tìm thấy dữ liệu tuyến đường");
      }
    } catch (error) {
      alert("Lỗi: " + error.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Navigation className="text-emerald-500" size={32} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Lên kế hoạch chuyến đi
          </h1>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Left Sidebar - Input */}
        <aside className="w-full lg:w-[400px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto z-20 shadow-xl">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl shadow-inner space-y-4">
              {/* Inputs */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Điểm đi</label>
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl p-3 mt-1 border border-gray-200 dark:border-gray-600">
                  <MapPin className="text-gray-400 mr-2" size={20} />
                  <input 
                    className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white"
                    value={startLocation} onChange={e => setStartLocation(e.target.value)} 
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Điểm đến</label>
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl p-3 mt-1 border border-gray-200 dark:border-gray-600">
                  <MapPin className="text-emerald-500 mr-2" size={20} />
                  <input 
                    className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white"
                    value={endLocation} onChange={e => setEndLocation(e.target.value)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={journeyDate} onChange={e => setJourneyDate(e.target.value)} className="p-3 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-900 dark:text-white outline-none" />
                <input type="time" value={journeyTime} onChange={e => setJourneyTime(e.target.value)} className="p-3 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-900 dark:text-white outline-none" />
              </div>

              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center gap-2"
              >
                {isSearching ? <Loader className="animate-spin" /> : "TÌM LỘ TRÌNH"}
              </button>
            </div>

            {/* Results */}
            {routeData && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Tổng quan</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Khoảng cách</p>
                      <p className="font-bold text-gray-900 dark:text-white">{routeData.distance || "N/A"} km</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Thời gian</p>
                      <p className="font-bold text-gray-900 dark:text-white">{routeData.duration || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Danh sách điểm thời tiết */}
                <h3 className="font-bold text-gray-900 dark:text-white">Dự báo trên đường đi</h3>
                <div className="space-y-2">
                  {(routeData.weatherPoints || []).map((point, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="text-sm font-mono text-gray-400">{point.time}</div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{point.locationName}</p>
                        <p className="text-xs text-gray-500">{point.weatherDesc}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">{point.temp}°C</p>
                        {point.isRain && <Droplets className="text-blue-500 inline w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Map Area (Placeholder - Tích hợp Google Maps/Leaflet sau này) */}
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
          <div className="text-center p-8">
            <div className="inline-block p-6 rounded-full bg-white dark:bg-gray-800 shadow-2xl mb-4">
              <Navigation size={48} className="text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Bản đồ lộ trình sẽ hiển thị tại đây</p>
          </div>
        </main>
      </div>
    </div>
  );
}