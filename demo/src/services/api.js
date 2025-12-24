// src/services/api.js
import axios from "axios";

// Đảm bảo URL này khớp với cấu hình server port và context-path của Backend
const API_BASE_URL = "http://localhost:8080/identity";

// Tạo axios instance với config chung
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request Interceptor: TỰ ĐỘNG THÊM TOKEN VÀO HEADER
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Backend Spring Security mặc định chuẩn "Bearer <token>"
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý lỗi chung
apiClient.interceptors.response.use(
  (response) => response.data, // Trả về data trực tiếp từ ApiResponse.result nếu cần, hoặc trả cả body
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// =====================================================
// 1. USER MANAGEMENT APIs
// =====================================================
export const userAPI = {
  // [QUAN TRỌNG] Đăng nhập: Gọi vào AuthController của Backend
  login: async (email, password) => {
    return apiClient.post("/auth/login", { email, password });
  },

  // Đăng ký
  register: async (userData) => {
    return apiClient.post("/User", userData);
  },

  // Lấy danh sách user (Admin)
  getAllUsers: async () => {
    return apiClient.get("/User");
  },

  // Lấy thông tin user theo ID
  getUserById: async (userId) => {
    return apiClient.get(`/User/${userId}`);
  },

  // Cập nhật thông tin user
  updateUser: async (userId, userData) => {
    return apiClient.put(`/User/${userId}`, userData);
  },

  // Xóa user
  deleteUser: async (userId) => {
    return apiClient.delete(`/User/${userId}`);
  },
};

// =====================================================
// 2. WEATHER FORECAST APIs
// =====================================================
export const weatherAPI = {
  getWeather: async (lat, lon, model = "best_match", days = 7) => {
    return apiClient.get("/weather", {
      params: {
        lat,
        lon,
        chucNang: "Dự báo thời tiết",
        model,
        days,
      },
    });
  },
};

// =====================================================
// 3. SAVED LOCATIONS APIs
// =====================================================
export const favoritesAPI = {
  create: async (data) => {
    return apiClient.post("/favorites", data);
  },
  getByUserId: async (userId) => {
    return apiClient.get("/favorites", { params: { userId } });
  },
  getById: async (id) => {
    return apiClient.get(`/favorites/${id}`);
  },
  update: async (id, data) => {
    return apiClient.put(`/favorites/${id}`, data);
  },
  delete: async (id) => {
    return apiClient.delete(`/favorites/${id}`);
  },
};

// =====================================================
// 4. SCHEDULE (Lịch Hẹn) APIs
// =====================================================
export const scheduleAPI = {
  create: async (userId, data) => {
    return apiClient.post(`/api/v1/lich-hen/user/${userId}`, data);
  },
  getByUserId: async (userId) => {
    return apiClient.get(`/api/v1/lich-hen/user/${userId}`);
  },
  getById: async (id) => {
    return apiClient.get(`/api/v1/lich-hen/${id}`);
  },
  update: async (id, data) => {
    return apiClient.put(`/api/v1/lich-hen/${id}`, data);
  },
  delete: async (id) => {
    return apiClient.delete(`/api/v1/lich-hen/${id}`);
  },
};

// =====================================================
// 5. JOURNEY (Hành Trình) APIs
// =====================================================
export const journeyAPI = {
  analyze: async (data) => {
    return apiClient.post("/trips/analyze", data);
  },
};

// =====================================================
// 6. COMMUNITY APIs
// =====================================================
export const communityAPI = {
  createPost: async (data) => {
    return apiClient.post("/community/create", data);
  },
  likePost: async (idAnh, userId) => {
    return apiClient.post(`/community/${idAnh}/like`, null, {
      params: { userId },
    });
  },
  reportPost: async (data) => {
    return apiClient.post("/community/report", data);
  },
};

// =====================================================
// 7. SEARCH HISTORY APIs
// =====================================================
export const searchHistoryAPI = {
  add: async (data) => {
    return apiClient.post("/search-history", data);
  },
  getByUserId: async (userId) => {
    return apiClient.get("/search-history", { params: { userId } });
  },
  delete: async (id) => {
    return apiClient.delete(`/search-history/${id}`);
  },
  deleteAll: async (userId) => {
    return apiClient.delete("/search-history/all", { params: { userId } });
  },
};

// =====================================================
// 8. NOTIFICATIONS APIs
// =====================================================
export const notificationsAPI = {
  getByUserId: async (userId) => {
    return apiClient.get(`/notifications/user/${userId}`);
  },
  getById: async (id) => {
    return apiClient.get(`/notifications/${id}`);
  },
  delete: async (id) => {
    return apiClient.delete(`/notifications/${id}`);
  },
  deleteAll: async (userId) => {
    return apiClient.delete(`/notifications/user/${userId}`);
  },
};

// =====================================================
// 9. DATA SOURCE APIs
// =====================================================
export const dataSourceAPI = {
  getAll: async () => {
    return apiClient.get("/nguon-du-lieu");
  },
  getById: async (id) => {
    return apiClient.get(`/nguon-du-lieu/${id}`);
  },
  create: async (data) => {
    return apiClient.post("/nguon-du-lieu", data);
  },
  update: async (id, data) => {
    return apiClient.put(`/nguon-du-lieu/${id}`, data);
  },
  delete: async (id) => {
    return apiClient.delete(`/nguon-du-lieu/${id}`);
  },
};

// =====================================================
// 10. NOTIFICATION SETTINGS APIs
// =====================================================
export const notificationSettingsAPI = {
  create: async (userId, data) => {
    return apiClient.post(`/notification-settings/user/${userId}`, data);
  },
  getByUserId: async (userId) => {
    return apiClient.get(`/notification-settings/user/${userId}`);
  },
  getById: async (id) => {
    return apiClient.get(`/notification-settings/${id}`);
  },
  update: async (id, data) => {
    return apiClient.put(`/notification-settings/${id}`, data);
  },
  delete: async (id) => {
    return apiClient.delete(`/notification-settings/${id}`);
  },
};

export default {
  user: userAPI,
  weather: weatherAPI,
  favorites: favoritesAPI,
  schedule: scheduleAPI,
  journey: journeyAPI,
  community: communityAPI,
  searchHistory: searchHistoryAPI,
  notifications: notificationsAPI,
  dataSource: dataSourceAPI,
  notificationSettings: notificationSettingsAPI,
};