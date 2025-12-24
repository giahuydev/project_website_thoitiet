// src/hooks/useAPI.js
import { useState, useEffect } from "react";
import api from "../services/api";

// =====================================================
// HOOK CHUNG cho các API calls
// =====================================================
export const useAPI = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiFunction();
        setData(result.result || result); // Backend trả về {code, result, message}
        setError(null);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

// =====================================================
// HOOK: Lấy thông tin User hiện tại
// =====================================================
export const useCurrentUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.user.getUserById(userId);
        setUser(response.result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

// =====================================================
// HOOK: Lấy dữ liệu thời tiết
// =====================================================
export const useWeather = (lat, lon, model = "best_match", days = 7) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await api.weather.getWeather(lat, lon, model, days);
        setWeather(response.result);
        setError(null);
      } catch (err) {
        setError(err.message || "Không thể tải dữ liệu thời tiết");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, model, days]);

  return { weather, loading, error };
};

// =====================================================
// HOOK: Lấy danh sách địa điểm yêu thích
// =====================================================
export const useFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.favorites.getByUserId(userId);
      setFavorites(response.result || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  const addFavorite = async (data) => {
    try {
      await api.favorites.create(data);
      await fetchFavorites(); // Reload danh sách
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await api.favorites.delete(id);
      await fetchFavorites(); // Reload danh sách
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    deleteFavorite,
    refetch: fetchFavorites,
  };
};

// =====================================================
// HOOK: Lấy danh sách lịch hẹn
// =====================================================
export const useSchedule = (userId) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.schedule.getByUserId(userId);
      setSchedules(response.result || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [userId]);

  const createSchedule = async (data) => {
    try {
      await api.schedule.create(userId, data);
      await fetchSchedules();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await api.schedule.delete(id);
      await fetchSchedules();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    schedules,
    loading,
    error,
    createSchedule,
    deleteSchedule,
    refetch: fetchSchedules,
  };
};

// =====================================================
// HOOK: Lấy lịch sử tìm kiếm
// =====================================================
export const useSearchHistory = (userId) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.searchHistory.getByUserId(userId);
      setHistory(response.result || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const addToHistory = async (data) => {
    try {
      await api.searchHistory.add(data);
      await fetchHistory();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const clearHistory = async () => {
    try {
      await api.searchHistory.deleteAll(userId);
      await fetchHistory();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    history,
    loading,
    error,
    addToHistory,
    clearHistory,
    refetch: fetchHistory,
  };
};

// =====================================================
// HOOK: Lấy thông báo
// =====================================================
export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.notifications.getByUserId(userId);
      setNotifications(response.result || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const deleteNotification = async (id) => {
    try {
      await api.notifications.delete(id);
      await fetchNotifications();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const clearAll = async () => {
    try {
      await api.notifications.deleteAll(userId);
      await fetchNotifications();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    notifications,
    loading,
    error,
    deleteNotification,
    clearAll,
    refetch: fetchNotifications,
  };
};
    