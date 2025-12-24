// demo/src/constants/index.js

// ✅ Base URL khớp với BE (context-path: /identity)
export const BACKEND_BASE_URL = "http://localhost:8080/identity";

// ✅ API Sources - Chỉ dùng "Dự báo thời tiết" (tenChucNang trong DB)
export const API_SOURCES = {
  SPRING_BOOT_OPENMETEO: "Dự báo thời tiết", // Khớp với tenChucNang trong NguonDuLieu
};

// ✅ Weather Models (maModelApi từ MoHinhDuBao)
export const WEATHER_MODELS = {
  BEST_MATCH: "best_match",
  ICON_SEAMLESS: "icon_seamless",
  GFS_SEAMLESS: "gfs_seamless",
  METEOFRANCE_SEAMLESS: "meteofrance_seamless",
};
