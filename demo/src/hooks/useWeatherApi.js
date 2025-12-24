import { useState, useEffect } from "react";
import { BACKEND_BASE_URL } from "../constants/index";

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
    if (!location) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Xử lý model input
        let apiModel = model;
        if (!apiModel || apiModel === "Dự báo thời tiết") {
            apiModel = "best_match";
        }

        // 2. Geocoding
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;
        const geoResponse = await fetch(nominatimUrl);
        const geoData = await geoResponse.json();
        
        if (!geoData || geoData.length === 0) {
          throw new Error(`Không tìm thấy địa điểm: "${location}"`);
        }

        const { lat, lon, display_name } = geoData[0];

        // 3. Gọi Backend
        const weatherUrl = `${BACKEND_BASE_URL}/weather?lat=${lat}&lon=${lon}&chucNang=Dự báo thời tiết&model=${apiModel}&days=7`;
        console.log("🌐 Calling API:", weatherUrl);

        const weatherResponse = await fetch(weatherUrl);
        const apiResult = await weatherResponse.json();

        if (apiResult.code !== 1000 || !apiResult.result) {
          throw new Error(apiResult.message || "Lỗi dữ liệu server");
        }

        const { result } = apiResult;

        // 4. Transform Dữ Liệu
        // --- Current ---
        const transformedCurrent = {
          name: display_name.split(",")[0],
          coord: { lat: parseFloat(lat), lon: parseFloat(lon) },
          main: {
            temp: result.current?.temperature_2m || 0,
            feels_like: result.current?.apparent_temperature || 0,
            humidity: result.current?.relative_humidity_2m || 0,
          },
          wind: { speed: (result.current?.wind_speed_10m || 0) / 3.6 },
          clouds: { all: result.current?.cloud_cover || 0 },
          weather: [{
            description: decodeWeatherCode(result.current?.weather_code),
            icon: getWeatherIcon(result.current?.weather_code, result.current?.is_day),
          }],
        };

        // --- Hourly (Quan trọng: Xử lý mưa) ---
        const transformedHourly = (result.hourly || []).slice(0, 24).map((hour) => ({
            dt: new Date(hour.time).getTime() / 1000,
            main: { temp: hour.temperature2m || 0 },
            weather: [{
                description: decodeWeatherCode(hour.weatherCode),
                icon: getWeatherIcon(hour.weatherCode, hour.isDay),
            }],
            // [FIX] Lấy trực tiếp precipitation, nếu null thì = 0
            rain: hour.precipitation || 0, 
            pop: hour.precipitationProbability || 0
        }));

        // --- Daily ---
        const dailyList = (result.daily || []).slice(0, 7).map((day) => ({
          dt: new Date(day.time).getTime() / 1000,
          dt_txt: day.time,
          main: {
            temp_min: day.temperature2mMin || 0,
            temp_max: day.temperature2mMax || 0,
            temp: ((day.temperature2mMin || 0) + (day.temperature2mMax || 0)) / 2,
          },
          weather: [{
            description: decodeWeatherCode(day.weatherCode),
            icon: getWeatherIcon(day.weatherCode, 1),
          }],
        }));

        setCurrent(transformedCurrent);
        setHourly(transformedHourly);
        setDaily({ list: dailyList });
        setLocationData({ lat: parseFloat(lat), lon: parseFloat(lon) });

      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setHourly([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, model]);

  return { current, hourly, daily, location: locationData, loading, error };
}

// Helpers
function decodeWeatherCode(code) {
  const map = { 0:"Trời quang",1:"Ít mây",2:"Mây rải rác",3:"Nhiều mây",45:"Sương mù",51:"Mưa phùn",53:"Mưa phùn",61:"Mưa nhẹ",63:"Mưa vừa",65:"Mưa to",80:"Mưa rào",81:"Mưa rào",82:"Mưa to",95:"Giông bão" };
  return map[code] || "Không xác định";
}
function getWeatherIcon(code, isDay) {
  const map = { 0:"01",1:"02",2:"03",3:"04",45:"50",51:"09",61:"10",80:"09",95:"11" };
  return `${map[code] || "02"}${isDay === 1 ? 'd' : 'n'}`;
}