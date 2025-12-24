// src/pages/WeatherPage.jsx
import { useState } from "react";
import WeatherChart from "../components/WeatherChart";
import MapSelector from "../components/MapSelector";
import PremiumBanner from "../components/PremiumBanner";
import useWeatherApi from "../hooks/useWeatherApi";
import { Bookmark, Navigation, TrendingUp } from "lucide-react";

export default function WeatherPage({ apiSource }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCity, setCurrentCity] = useState("Thành phố Hồ Chí Minh");

  const { current, hourly, daily, location, loading, error } = useWeatherApi(
    currentCity,
    apiSource
  );

  const handleSearch = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchQuery.trim()) {
      setCurrentCity(searchQuery.trim());
      setSearchQuery("");
    }
  };

  const forecast7Day = daily?.list?.slice(0, 7) || [];
  const forecastHourly = hourly?.slice(0, 24) || []; // Lấy 24h để khớp với biểu đồ
  const weatherData = current || {};
  const currentTemp = Math.round(weatherData.main?.temp) || "-";
  const locationName = weatherData.name || currentCity;
  const description = weatherData.weather?.[0]?.description || "Đang tải...";

  // Loading State
  if (loading && !current) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-700 dark:text-gray-300">
          <span className="text-4xl animate-pulse">☁️</span>
          <p className="mt-4 text-lg">
            Đang tải dữ liệu thời tiết cho {currentCity}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Error Message */}
      {error && (
        <div className="mb-6">
          <div
            className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">⚠️ Lỗi Kết Nối Dữ Liệu!</strong>
            <p className="block sm:inline ml-2">
              Không thể tải dữ liệu mới: {error}.
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left 2 columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. SEARCH BOX */}
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                📍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Tìm kiếm thành phố, quận, tỉnh..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* 2. WEATHER CARD */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">{locationName}</h2>
                <p className="text-blue-100 capitalize">{description}</p>
              </div>
              <span className="text-5xl">
                {weatherData.weather?.[0]?.icon ? (
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={description}
                    className="w-16 h-16"
                  />
                ) : (
                  "☁️"
                )}
              </span>
            </div>

            <div className="text-6xl font-bold mb-8">{currentTemp}°C</div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <span className="text-xl">💨</span>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Gió</p>
                  <p className="font-semibold">
                    {weatherData.wind?.speed
                      ? `${weatherData.wind.speed.toFixed(1)} m/s`
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <span className="text-xl">💧</span>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Độ ẩm</p>
                  <p className="font-semibold">
                    {weatherData.main?.humidity
                      ? `${weatherData.main.humidity}%`
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <span className="text-xl">👁️</span>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Cảm giác</p>
                  <p className="font-semibold">
                    {weatherData.main?.feels_like
                      ? `${Math.round(weatherData.main.feels_like)}°C`
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <span className="text-xl">☁️</span>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Mây</p>
                  <p className="font-semibold">
                    {weatherData.clouds?.all ? `${weatherData.clouds.all}%` : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MAP */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
            style={{ height: "400px" }}
          >
            <MapSelector position={location} />
          </div>

          {/* 4. HOURLY FORECAST LIST */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              ⏰ Dự báo {forecastHourly.length} giờ tới
            </h3>
            <div className="overflow-x-auto -mx-6 px-6">
              <div className="flex space-x-4 min-w-max pb-2">
                {forecastHourly.map((hour, i) => {
                  const time = new Date(hour.dt * 1000);
                  const temp = Math.round(hour.main?.temp) || "-";
                  const descriptionHourly = hour.weather?.[0]?.description || "N/A";
                  const icon = hour.weather?.[0]?.icon || "04d";
                  
                  // [QUAN TRỌNG] Lấy biến rain trực tiếp (đã xử lý ở Hook)
                  const rainVolume = hour.rain; 

                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center space-y-2 min-w-[80px] p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition cursor-pointer active:scale-95 relative"
                    >
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {time.getHours()}:00
                      </p>
                      <span className="text-3xl">
                        <img
                          src={`https://openweathermap.org/img/wn/${icon}.png`}
                          alt={descriptionHourly}
                          className="w-8 h-8"
                        />
                      </span>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {temp}°
                      </p>
                      
                      {/* Hiển thị lượng mưa nếu > 0 */}
                      {rainVolume > 0 && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-blue-500 font-bold bg-blue-100 dark:bg-blue-900/50 rounded-full px-2 py-0.5 whitespace-nowrap">
                          {rainVolume}mm
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 5. CHART */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              📊 Biểu đồ thời tiết chi tiết
            </h3>
            {/* Truyền forecastHourly vào chart */}
            <WeatherChart data={forecastHourly} />
          </div>

          {/* 6. 7-DAY FORECAST */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              📅 Dự báo {forecast7Day.length} ngày tới
            </h3>
            <div className="space-y-3">
              {forecast7Day.map((day, i) => {
                const date = new Date(day.dt * 1000);
                const dayName = date.toLocaleDateString("vi-VN", {
                  weekday: "short",
                  day: "numeric",
                  month: "numeric",
                });
                const descriptionDay =
                  day.weather?.[0]?.description || "Đang cập nhật";
                const tempMin = Math.round(day.main?.temp_min || 0);
                const tempMax = Math.round(day.main?.temp_max || 0);
                const icon = day.weather?.[0]?.icon || "04d";

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition cursor-pointer active:scale-[0.99]"
                  >
                    <p className="font-medium text-gray-900 dark:text-white w-32 capitalize">
                      {dayName}
                    </p>
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-2xl">
                        <img
                          src={`https://openweathermap.org/img/wn/${icon}.png`}
                          alt={descriptionDay}
                          className="w-8 h-8"
                        />
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {descriptionDay}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 dark:text-gray-400">
                        {tempMin}°
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {tempMax}°
                      </span>
                    </div>
                  </div>
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

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Thao tác nhanh
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all active:scale-[0.98]">
                  <Bookmark className="text-blue-500" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">
                    Lưu địa điểm
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all active:scale-[0.98]">
                  <Navigation className="text-emerald-500" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">
                    Tạo hành trình
                  </span>
                </button>
              </div>
            </div>

            {/* Weather Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-blue-500" size={20} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Xu hướng
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Nhiệt độ cao nhất
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {Math.max(...forecast7Day.map(d => d.main?.temp_max || 0))}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Nhiệt độ thấp nhất
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {Math.min(...forecast7Day.map(d => d.main?.temp_min || 100))}°C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Độ ẩm trung bình
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {weatherData.main?.humidity || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}