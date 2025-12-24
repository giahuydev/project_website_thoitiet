// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khôi phục session từ localStorage khi app khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // =====================================================
  // ĐĂNG KÝ
  // =====================================================
  const register = async (userData) => {
    try {
      setLoading(true);
      // Gọi API đăng ký
      const response = await api.user.register(userData);
      
      // Kiểm tra response từ backend (ApiResponse structure)
      if (response && response.result) {
        const newUser = response.result;
        
        // Tùy chọn: Có thể tự động login luôn hoặc yêu cầu user login lại
        // Ở đây giả sử đăng ký xong cần đăng nhập lại để lấy token
        return { success: true, user: newUser };
      }
      
      throw new Error(response.message || "Đăng ký không thành công");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || err.message || "Lỗi đăng ký";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ĐĂNG NHẬP (REAL - ĐÃ KẾT NỐI BACKEND)
  // =====================================================
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      // Gọi API login
      const response = await api.user.login(email, password);

      // Kiểm tra kết quả từ ApiResponse của Backend
      // Backend trả về: { code: 1000, result: { token, authenticated, idNguoiDung, ... } }
      if (response.result && response.result.authenticated) {
        const authData = response.result;

        // Tạo object user để lưu (không lưu password)
        const userData = {
          idNguoiDung: authData.idNguoiDung,
          email: authData.email,
          hoTen: authData.hoTen || authData.email, // Fallback nếu hoTen null
        };

        // Cập nhật State và LocalStorage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authData.token); // [QUAN TRỌNG] Lưu token

        return { success: true, user: userData };
      } else {
        throw new Error(response.message || "Đăng nhập thất bại");
      }

    } catch (err) {
      console.error(err);
      // Lấy message lỗi chi tiết từ backend nếu có
      const errorMsg = err.response?.data?.message || err.message || "Email hoặc mật khẩu không đúng";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ĐĂNG XUẤT
  // =====================================================
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Xóa token
    setError(null);
  };

  // =====================================================
  // CẬP NHẬT THÔNG TIN USER
  // =====================================================
  const updateUser = async (userData) => {
    if (!user?.idNguoiDung) {
      return { success: false, error: "Chưa đăng nhập" };
    }

    try {
      setLoading(true);
      const response = await api.user.updateUser(user.idNguoiDung, userData);

      if (response.result) {
        const updatedUser = { ...user, ...response.result };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setError(null);
        return { success: true, user: updatedUser };
      }

      throw new Error("Cập nhật thất bại");
    } catch (err) {
      const errorMsg = err.message || "Không thể cập nhật thông tin";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};