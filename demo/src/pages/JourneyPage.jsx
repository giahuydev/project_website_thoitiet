// src/pages/JourneyPage.jsx
import { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  AlertTriangle,
  Cloud,
  Droplets,
  Crown,
} from "lucide-react";
import PremiumBanner from "../components/PremiumBanner";

export default function JourneyPage() {
  const [startLocation, setStartLocation] = useState("Hanoi, Vietnam");
  const [endLocation, setEndLocation] = useState("Da Nang, Vietnam");
  const [journeyDate, setJourneyDate] = useState("");
  const [journeyTime, setJourneyTime] = useState("08:00");
  const [activeLayer, setActiveLayer] = useState("route");
  const [mapZoom, setMapZoom] = useState(8);
  const [isSearching, setIsSearching] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showPointDetail, setShowPointDetail] = useState(false);

  // Calculate stats based on locations
  const calculateDistance = () => {
    const distances = {
      "Hanoi-Da Nang": 760,
      "Hanoi-Ho Chi Minh": 1710,
      "Da Nang-Ho Chi Minh": 950,
      "Hanoi-Ninh Binh": 95,
      "Da Nang-Hue": 100,
    };
    const key = `${startLocation.split(",")[0]}-${endLocation.split(",")[0]}`;
    return distances[key] || 500;
  };

  const distance = calculateDistance();
  const travelTime = Math.floor(distance / 55); // ~55km/h average
  const avgTemp = journeyDate ? "26°C" : "--°C";

  const stats = [
    { label: "Khoảng cách", value: `${distance} km` },
    {
      label: "Thời gian",
      value: `${Math.floor(travelTime)}h ${Math.round((travelTime % 1) * 60)}m`,
    },
    { label: "Nhiệt độ TB", value: avgTemp },
  ];

  // Generate route points based on time
  const generateRoutePoints = () => {
    if (!journeyDate || !journeyTime) return [];

    const [hours, minutes] = journeyTime.split(":").map(Number);
    const startTime = hours * 60 + minutes;

    const points = [
      {
        id: 1,
        name: `${startLocation.split(",")[0]} (Start)`,
        offset: 0,
        temp: "24°C",
        condition: "Nắng đẹp",
        icon: "sunny",
        warning: false,
      },
      {
        id: 2,
        name: "Ninh Binh",
        offset: 150,
        temp: "26°C",
        condition: "Nhiều mây",
        icon: "cloud",
        warning: false,
      },
      {
        id: 3,
        name: "Vinh",
        offset: 315,
        temp: "22°C",
        condition: hours >= 12 && hours <= 18 ? "Mưa nhỏ" : "Quang đãng",
        icon: "rainy",
        warning: hours >= 12 && hours <= 18,
      },
      {
        id: 4,
        name: `${endLocation.split(",")[0]} (End)`,
        offset: travelTime * 60,
        temp: "28°C",
        condition: "Quang đãng",
        icon: "sunny",
        warning: false,
      },
    ];

    return points.map((point) => {
      const timeInMinutes = startTime + point.offset;
      const h = Math.floor(timeInMinutes / 60) % 24;
      const m = timeInMinutes % 60;
      return {
        ...point,
        time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      };
    });
  };

  const routePoints =
    generateRoutePoints().length > 0
      ? generateRoutePoints()
      : [
          {
            id: 1,
            name: "Hanoi (Start)",
            time: "08:00",
            temp: "24°C",
            condition: "Nắng đẹp",
            icon: "sunny",
            warning: false,
          },
          {
            id: 2,
            name: "Ninh Binh",
            time: "10:30",
            temp: "26°C",
            condition: "Nhiều mây",
            icon: "cloud",
            warning: false,
          },
          {
            id: 3,
            name: "Vinh",
            time: "13:15",
            temp: "22°C",
            condition: "Mưa nhỏ",
            icon: "rainy",
            warning: true,
          },
          {
            id: 4,
            name: "Da Nang (End)",
            time: "22:20",
            temp: "28°C",
            condition: "Quang đãng",
            icon: "sunny",
            warning: false,
          },
        ];

  const handleSearch = async () => {
    if (!startLocation || !endLocation) {
      alert("Vui lòng nhập điểm đi và điểm đến");
      return;
    }

    if (!journeyDate || !journeyTime) {
      alert("Vui lòng chọn ngày và giờ khởi hành");
      return;
    }

    setIsSearching(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSearching(false);

    // Show success message
    console.log("✅ Tìm kiếm thành công:", {
      startLocation,
      endLocation,
      journeyDate,
      journeyTime,
      distance: `${distance} km`,
      travelTime: `${Math.floor(travelTime)}h ${Math.round(
        (travelTime % 1) * 60
      )}m`,
    });
  };

  const handleZoomIn = () => {
    setMapZoom((prev) => {
      const newZoom = Math.min(prev + 1, 15);
      console.log(`🔍 Zoom in: ${prev} → ${newZoom}`);
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setMapZoom((prev) => {
      const newZoom = Math.max(prev - 1, 3);
      console.log(`🔍 Zoom out: ${prev} → ${newZoom}`);
      return newZoom;
    });
  };

  const handleNavigate = () => {
    if (!journeyDate || !journeyTime) {
      alert("Vui lòng chọn ngày và giờ trước khi điều hướng");
      return;
    }

    setIsNavigating(!isNavigating);
    console.log(isNavigating ? "⏸️ Dừng điều hướng" : "▶️ Bắt đầu điều hướng");

    if (!isNavigating) {
      // Start navigation
      alert(
        `🚗 Bắt đầu điều hướng\nTừ: ${startLocation}\nĐến: ${endLocation}\nKhởi hành: ${journeyDate} lúc ${journeyTime}`
      );
    }
  };

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setShowPointDetail(true);
    console.log("📍 Selected point:", point);
  };

  const handleLayerChange = (layer) => {
    setActiveLayer(layer);
    console.log(`🗺️ Switched to ${layer} layer`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="fixed top-4 left-4 z-50 flex items-center gap-3">
              <Navigation className="text-emerald-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Lên kế hoạch chuyến đi
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Weather-guided journey planning
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)]">
        {/* Left Sidebar - Input & Route Details */}
        <aside className="w-full lg:w-[450px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto shadow-xl z-70">
          {/* Headline */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tạo lộ trình
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Lên kế hoạch và tránh thời tiết xấu
            </p>
          </div>

          {/* Premium Banner */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <PremiumBanner />
          </div>

          {/* Input Form */}
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
              {/* Start Location */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Điểm đi
                </label>
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
                  <div className="p-4">
                    <MapPin className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="flex-1 p-4 bg-transparent outline-none text-gray-900 dark:text-white font-medium"
                    placeholder="Nhập điểm đi..."
                  />
                </div>
              </div>

              {/* End Location */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Điểm đến
                </label>
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
                  <div className="p-4">
                    <MapPin className="text-emerald-500" size={20} />
                  </div>
                  <input
                    type="text"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    className="flex-1 p-4 bg-transparent outline-none text-gray-900 dark:text-white font-medium"
                    placeholder="Nhập điểm đến..."
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Ngày
                  </label>
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => {
                      setJourneyDate(e.target.value);
                      console.log("📅 Đã chọn ngày:", e.target.value);
                    }}
                    className="w-full p-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white cursor-pointer transition-all shadow-md hover:shadow-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Giờ
                  </label>
                  <input
                    type="time"
                    value={journeyTime}
                    onChange={(e) => {
                      setJourneyTime(e.target.value);
                      console.log("🕐 Đã chọn giờ:", e.target.value);
                    }}
                    className="w-full p-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white cursor-pointer transition-all shadow-md hover:shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className={`w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                isSearching ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ĐANG TÌM KIẾM...
                </>
              ) : (
                <>
                  <Navigation size={20} />
                  TÌM LỘ TRÌNH
                </>
              )}
            </button>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Stats Bar */}
          <div className="p-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xs uppercase font-bold text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation */}
          {journeyTime && routePoints.some((p) => p.warning) && (
            <div className="p-6">
              <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Cloud className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    Khởi hành tối ưu
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Nên đi lúc <span className="font-bold">06:00</span> để tránh
                    mưa to ở Vinh.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Route Timeline */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Navigation size={20} className="text-emerald-500" />
              Chi tiết lộ trình
            </h3>

            <div className="space-y-2">
              {routePoints.map((point, i) => (
                <div
                  key={point.id}
                  onClick={() => handlePointClick(point)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                    point.warning
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  } ${
                    selectedPoint?.id === point.id
                      ? "ring-2 ring-emerald-500"
                      : ""
                  }`}
                >
                  <div
                    className={`text-sm font-mono font-bold ${
                      point.warning ? "text-yellow-600" : "text-gray-500"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p
                        className={`font-bold truncate ${
                          point.warning
                            ? "text-yellow-700 dark:text-yellow-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {point.name}
                      </p>
                      <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                        {point.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      {point.warning ? (
                        <>
                          <Droplets size={14} className="text-blue-500" />
                          <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                            {point.condition} • {point.temp}
                          </span>
                        </>
                      ) : (
                        <>
                          <Cloud size={14} />
                          <span>
                            {point.temp} • {point.condition}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {point.warning && (
                    <AlertTriangle className="text-yellow-500" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Map Area */}
        <main className="flex-1 relative bg-gray-900 overflow-hidden">
          {/* Map Background (Simulated) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-500"
            style={{
              opacity:
                activeLayer === "route"
                  ? 0.8
                  : activeLayer === "radar"
                  ? 0.6
                  : 0.7,
              transform: `scale(${1 + (mapZoom - 8) * 0.05})`,
            }}
          >
            {/* Layer effects */}
            {activeLayer === "radar" && (
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent animate-pulse"></div>
            )}
            {activeLayer === "wind" && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse"></div>
            )}
          </div>

          {/* SVG Route Visualization */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `scale(${1 + (mapZoom - 8) * 0.05})`,
              transition: "transform 0.3s",
            }}
          >
            <defs>
              <linearGradient
                id="routeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Dashed Line - Planned Route */}
            <path
              d="M 200 100 Q 250 200 300 250 T 450 400 T 600 500"
              fill="none"
              stroke="#10b981"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeWidth="3"
              opacity={activeLayer === "route" ? "0.5" : "0.2"}
            />

            {/* Solid Line - Current Progress */}
            <path
              d="M 200 100 Q 250 200 300 250"
              fill="none"
              stroke="url(#routeGradient)"
              strokeLinecap="round"
              strokeWidth="4"
              opacity={activeLayer === "route" ? "1" : "0.5"}
            />
          </svg>

          {/* Location Markers */}
          <div className="absolute top-[16%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-bold px-3 py-2 rounded-lg mb-2 shadow-xl border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              Hanoi 24°
            </div>
            <div className="w-4 h-4 bg-emerald-500 rounded-full ring-4 ring-emerald-500/20 shadow-lg"></div>
          </div>

          {/* Warning Marker */}
          <div className="absolute top-[66%] left-[56%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-2xl border-2 border-yellow-500 flex items-center gap-3 mb-2 transform group-hover:scale-110 transition-transform">
              <Droplets className="text-blue-500" size={20} />
              <div>
                <span className="text-gray-900 dark:text-white text-sm font-bold block">
                  Vinh • 22°
                </span>
                <span className="text-yellow-600 dark:text-yellow-400 text-xs uppercase font-bold tracking-wide">
                  CẢNH BÁO MƯA
                </span>
              </div>
            </div>
            <div className="w-5 h-5 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse shadow-lg"></div>
          </div>

          {/* End Marker */}
          <div className="absolute top-[83%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-bold px-3 py-2 rounded-lg mb-2 shadow-xl border border-gray-200 dark:border-gray-700 whitespace-nowrap">
              Da Nang 28°
            </div>
            <MapPin
              className="text-emerald-500 drop-shadow-xl"
              size={40}
              fill="currentColor"
            />
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <button
                onClick={handleZoomIn}
                className="w-12 h-12 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 transition active:scale-95 text-xl font-bold"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="w-12 h-12 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition active:scale-95 text-xl font-bold"
              >
                −
              </button>
            </div>

            <button
              onClick={handleNavigate}
              className={`w-14 h-14 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center ${
                isNavigating
                  ? "bg-red-500 animate-pulse"
                  : "bg-gradient-to-br from-emerald-500 to-cyan-500"
              } text-white`}
              title={isNavigating ? "Dừng điều hướng" : "Bắt đầu điều hướng"}
            >
              <Navigation
                size={24}
                className={isNavigating ? "animate-spin" : ""}
              />
            </button>
          </div>

          {/* Layer Controls */}
          <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-gray-700 z-10">
            <div className="flex gap-2">
              {["route", "radar", "wind"].map((layer) => (
                <button
                  key={layer}
                  onClick={() => handleLayerChange(layer)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all ${
                    activeLayer === layer
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white transform scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {layer === "route"
                    ? "Route"
                    : layer === "radar"
                    ? "Radar"
                    : "Wind"}
                </button>
              ))}
            </div>
          </div>

          {/* Point Detail Modal */}
          {showPointDetail && selectedPoint && (
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowPointDetail(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedPoint.name}
                  </h3>
                  <button
                    onClick={() => setShowPointDetail(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Clock className="text-emerald-500" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Thời gian đến
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedPoint.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Cloud className="text-blue-500" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Nhiệt độ
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedPoint.temp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Droplets className="text-cyan-500" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Điều kiện
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedPoint.condition}
                      </p>
                    </div>
                  </div>

                  {selectedPoint.warning && (
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-xl">
                      <AlertTriangle className="text-yellow-500" size={24} />
                      <div>
                        <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
                          Cảnh báo thời tiết xấu
                        </p>
                        <p className="text-xs text-yellow-600 dark:text-yellow-500">
                          Nên cẩn thận khi di chuyển
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
