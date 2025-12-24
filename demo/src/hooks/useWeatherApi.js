// demo/src/hooks/useWeatherApi.js
import { useState, useEffect } from "react";
import { BACKEND_BASE_URL } from "../constants/index";

/**
 * Hook gọi API Weather từ Spring Boot Backend
 * @param {string} location - Tên địa điểm (VD: "Hanoi", "Ho Chi Minh City")
 * @param {string} model - Model API (VD: "best_match", "icon_seamless")
 */
export default function useWeatherApi(
  location = "Ho Chi Minh City",
  model = "best_match"
) {
  const [current, setCurrent] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState({ list: [] });
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) {
      setLoading(false);
      setError("Thiếu tên địa điểm");
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ 1. Gọi Nominatim để lấy tọa độ từ tên địa điểm
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}&limit=1`;

        const geoResponse = await fetch(nominatimUrl);
        if (!geoResponse.ok) throw new Error("Không thể tìm địa chỉ");

        const geoData = await geoResponse.json();
        if (!geoData || geoData.length === 0) {
          throw new Error(`Không tìm thấy địa điểm: ${location}`);
        }

        const { lat, lon, display_name } = geoData[0];

        // ✅ 2. Gọi Backend API với tọa độ
        const weatherUrl = `${BACKEND_BASE_URL}/weather?lat=${lat}&lon=${lon}&chucNang=Dự báo thời tiết&model=${model}&days=7`;

        console.log("🌐 Calling Weather API:", weatherUrl);

        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
          throw new Error(`Backend Error: ${weatherResponse.status}`);
        }

        const apiResult = await weatherResponse.json();

        // ✅ 3. Xử lý Response từ Backend
        if (apiResult.code !== 1000 || !apiResult.result) {
          throw new Error(apiResult.message || "Lỗi dữ liệu từ server");
        }

        const { result } = apiResult;

        // ✅ 4. Transform dữ liệu cho FE
        // Current Weather
        const transformedCurrent = {
          name: display_name.split(",")[0],
          coord: { lat: parseFloat(lat), lon: parseFloat(lon) },
          main: {
            temp: result.current?.temperature_2m || 0,
            feels_like: result.current?.apparent_temperature || 0,
            humidity: result.current?.relative_humidity_2m || 0,
          },
          wind: {
            speed: (result.current?.wind_speed_10m || 0) / 3.6, // km/h -> m/s
          },
          clouds: {
            all: result.current?.cloud_cover || 0,
          },
          weather: [
            {
              description: decodeWeatherCode(result.current?.weather_code),
              icon: getWeatherIcon(
                result.current?.weather_code,
                result.current?.is_day
              ),
              main: decodeWeatherCode(result.current?.weather_code),
            },
          ],
        };

        // Hourly Forecast (12 giờ đầu)
        const transformedHourly = (result.hourly || [])
          .slice(0, 12)
          .map((hour) => ({
            dt: new Date(hour.time).getTime() / 1000,
            main: { temp: hour.temperature2m || 0 },
            weather: [
              {
                description: decodeWeatherCode(hour.weatherCode),
                icon: getWeatherIcon(hour.weatherCode, hour.isDay),
                main: decodeWeatherCode(hour.weatherCode),
              },
            ],
            rain:
              hour.precipitation > 0 ? { "1h": hour.precipitation } : undefined,
          }));

        // Daily Forecast (7 ngày)
        const dailyList = (result.daily || []).slice(0, 7).map((day) => ({
          dt: new Date(day.time).getTime() / 1000,
          dt_txt: day.time,
          main: {
            temp_min: day.temperature2mMin || 0,
            temp_max: day.temperature2mMax || 0,
            temp:
              ((day.temperature2mMin || 0) + (day.temperature2mMax || 0)) / 2,
          },
          weather: [
            {
              description: decodeWeatherCode(day.weatherCode),
              icon: getWeatherIcon(day.weatherCode, 1),
              main: decodeWeatherCode(day.weatherCode),
            },
          ],
        }));

        const transformedDaily = { list: dailyList };

        // ✅ 5. Set State
        setCurrent(transformedCurrent);
        setHourly(transformedHourly);
        setDaily(transformedDaily);
        setLocationData({ lat: parseFloat(lat), lon: parseFloat(lon) });

        console.log("✅ Weather data loaded successfully");
      } catch (err) {
        console.error("❌ Weather API Error:", err);
        setError(err.message || "Không thể tải dữ liệu thời tiết");
        setCurrent(null);
        setHourly([]);
        setDaily({ list: [] });
        setLocationData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, model]);

  return { current, hourly, daily, location: locationData, loading, error };
}

// ========== Helper Functions ==========

function decodeWeatherCode(code) {
  const weatherCodeMap = {
    0: "Trời quang",
    1: "Chủ yếu trời quang",
    2: "Mây rải rác",
    3: "Nhiều mây",
    45: "Có sương mù",
    48: "Sương mù đóng băng",
    51: "Mưa phùn nhẹ",
    53: "Mưa phùn vừa",
    55: "Mưa phùn dày đặc",
    61: "Mưa nhẹ",
    63: "Mưa vừa",
    65: "Mưa to",
    71: "Tuyết nhẹ",
    73: "Tuye vừa",
    75: "Tuyết dày",
    80: "Mưa rào nhẹ",
    81: "Mưa rào vừa",
    82: "Mưa rào to",
    95: "Giông bão",
    96: "Giông bão có mưa đá",
    99: "Giông bão có mưa đá lớn",
  };
  return weatherCodeMap[code] || "Không xác định";
}

function getWeatherIcon(code, isDay) {
  // Map WMO code -> OpenWeather icon
  const iconMap = {
    0: isDay === 1 ? "01d" : "01n", // Clear
    1: isDay === 1 ? "01d" : "01n", // Mainly clear
    2: isDay === 1 ? "02d" : "02n", // Partly cloudy
    3: "03d", // Overcast
    45: "50d", // Fog
    48: "50d", // Rime fog
    51: "09d", // Drizzle light
    53: "09d", // Drizzle moderate
    55: "09d", // Drizzle dense
    61: "10d", // Rain light
    63: "10d", // Rain moderate
    65: "10d", // Rain heavy
    71: "13d", // Snow light
    73: "13d", // Snow moderate
    75: "13d", // Snow heavy
    80: "09d", // Rain showers light
    81: "09d", // Rain showers moderate
    82: "09d", // Rain showers violent
    95: "11d", // Thunderstorm
    96: "11d", // Thunderstorm with hail
    99: "11d", // Thunderstorm with heavy hail
  };
  return iconMap[code] || "04d";
}
