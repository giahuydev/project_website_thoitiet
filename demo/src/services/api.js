// src/services/api.js
import axios from "axios";

// Base URL từ backend
const API_BASE_URL = "http://localhost:8080/identity";

// Tạo axios instance với config chung
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request Interceptor (để thêm token sau này)
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Thêm JWT token khi có authentication
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (xử lý lỗi chung)
apiClient.interceptors.response.use(
  (response) => response.data, // Trả về data trực tiếp
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// =====================================================
// 1. USER MANAGEMENT APIs
// =====================================================
export const userAPI = {
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
  // Lấy dữ liệu thời tiết
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
  // Thêm địa điểm yêu thích
  create: async (data) => {
    return apiClient.post("/favorites", data);
  },

  // Lấy danh sách địa điểm yêu thích
  getByUserId: async (userId) => {
    return apiClient.get("/favorites", {
      params: { userId },
    });
  },

  // Lấy chi tiết 1 địa điểm
  getById: async (id) => {
    return apiClient.get(`/favorites/${id}`);
  },

  // Cập nhật địa điểm
  update: async (id, data) => {
    return apiClient.put(`/favorites/${id}`, data);
  },

  // Xóa địa điểm
  delete: async (id) => {
    return apiClient.delete(`/favorites/${id}`);
  },
};

// =====================================================
// 4. SCHEDULE (Lịch Hẹn) APIs
// =====================================================
export const scheduleAPI = {
  // Tạo lịch hẹn
  create: async (userId, data) => {
    return apiClient.post(`/api/v1/lich-hen/user/${userId}`, data);
  },

  // Lấy danh sách lịch hẹn
  getByUserId: async (userId) => {
    return apiClient.get(`/api/v1/lich-hen/user/${userId}`);
  },

  // Lấy chi tiết lịch hẹn
  getById: async (id) => {
    return apiClient.get(`/api/v1/lich-hen/${id}`);
  },

  // Cập nhật lịch hẹn
  update: async (id, data) => {
    return apiClient.put(`/api/v1/lich-hen/${id}`, data);
  },

  // Xóa lịch hẹn
  delete: async (id) => {
    return apiClient.delete(`/api/v1/lich-hen/${id}`);
  },
};

// =====================================================
// 5. JOURNEY (Hành Trình) APIs
// =====================================================
export const journeyAPI = {
  // Phân tích hành trình
  analyze: async (data) => {
    return apiClient.post("/trips/analyze", data);
  },
};

// =====================================================
// 6. COMMUNITY APIs
// =====================================================
export const communityAPI = {
  // Đăng ảnh mới
  createPost: async (data) => {
    return apiClient.post("/community/create", data);
  },

  // Thích/bỏ thích ảnh
  likePost: async (idAnh, userId) => {
    return apiClient.post(`/community/${idAnh}/like`, null, {
      params: { userId },
    });
  },

  // Báo cáo vi phạm
  reportPost: async (data) => {
    return apiClient.post("/community/report", data);
  },
};

// =====================================================
// 7. SEARCH HISTORY APIs
// =====================================================
export const searchHistoryAPI = {
  // Thêm lịch sử tìm kiếm
  add: async (data) => {
    return apiClient.post("/search-history", data);
  },

  // Lấy lịch sử tìm kiếm
  getByUserId: async (userId) => {
    return apiClient.get("/search-history", {
      params: { userId },
    });
  },

  // Xóa 1 lịch sử
  delete: async (id) => {
    return apiClient.delete(`/search-history/${id}`);
  },

  // Xóa toàn bộ lịch sử
  deleteAll: async (userId) => {
    return apiClient.delete("/search-history/all", {
      params: { userId },
    });
  },
};

// =====================================================
// 8. NOTIFICATIONS APIs
// =====================================================
export const notificationsAPI = {
  // Lấy danh sách thông báo
  getByUserId: async (userId) => {
    return apiClient.get(`/notifications/user/${userId}`);
  },

  // Xem chi tiết thông báo
  getById: async (id) => {
    return apiClient.get(`/notifications/${id}`);
  },

  // Xóa thông báo
  delete: async (id) => {
    return apiClient.delete(`/notifications/${id}`);
  },

  // Xóa tất cả thông báo
  deleteAll: async (userId) => {
    return apiClient.delete(`/notifications/user/${userId}`);
  },
};

// =====================================================
// 9. DATA SOURCE (Nguồn Dữ Liệu) APIs
// =====================================================
export const dataSourceAPI = {
  // Lấy danh sách nguồn dữ liệu
  getAll: async () => {
    return apiClient.get("/nguon-du-lieu");
  },

  // Lấy chi tiết nguồn
  getById: async (id) => {
    return apiClient.get(`/nguon-du-lieu/${id}`);
  },

  // Tạo nguồn mới (Admin)
  create: async (data) => {
    return apiClient.post("/nguon-du-lieu", data);
  },

  // Cập nhật nguồn (Admin)
  update: async (id, data) => {
    return apiClient.put(`/nguon-du-lieu/${id}`, data);
  },

  // Xóa nguồn (Admin)
  delete: async (id) => {
    return apiClient.delete(`/nguon-du-lieu/${id}`);
  },
};

// =====================================================
// 10. NOTIFICATION SETTINGS APIs
// =====================================================
export const notificationSettingsAPI = {
  // Tạo cài đặt thông báo
  create: async (userId, data) => {
    return apiClient.post(`/notification-settings/user/${userId}`, data);
  },

  // Lấy danh sách cài đặt
  getByUserId: async (userId) => {
    return apiClient.get(`/notification-settings/user/${userId}`);
  },

  // Lấy chi tiết cài đặt
  getById: async (id) => {
    return apiClient.get(`/notification-settings/${id}`);
  },

  // Cập nhật cài đặt
  update: async (id, data) => {
    return apiClient.put(`/notification-settings/${id}`, data);
  },

  // Xóa cài đặt
  delete: async (id) => {
    return apiClient.delete(`/notification-settings/${id}`);
  },
};

// Export default object chứa tất cả APIs
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
