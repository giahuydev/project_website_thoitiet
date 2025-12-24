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
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
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
      const response = await api.user.register(userData);

      if (response.result) {
        const newUser = response.result;
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setError(null);
        return { success: true, user: newUser };
      }

      throw new Error("Đăng ký không thành công");
    } catch (err) {
      const errorMsg = err.message || "Đã xảy ra lỗi khi đăng ký";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ĐĂNG NHẬP (MOCK - Backend chưa có endpoint login)
  // =====================================================
  const login = async (email, password) => {
    try {
      setLoading(true);

      // TODO: Gọi API login khi backend đã implement
      // Hiện tại mock bằng cách lấy user theo email
      const response = await api.user.getAllUsers();
      const foundUser = response.result?.find((u) => u.email === email);

      if (!foundUser) {
        throw new Error("Email hoặc mật khẩu không đúng");
      }

      // KHÔNG NÊN so sánh password trực tiếp như này trong production!
      // Backend cần có endpoint /login để verify password đã hash
      if (foundUser.matKhau !== password) {
        throw new Error("Email hoặc mật khẩu không đúng");
      }

      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setError(null);
      return { success: true, user: foundUser };
    } catch (err) {
      const errorMsg = err.message || "Đăng nhập thất bại";
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
        const updatedUser = response.result;
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

// Custom hook để sử dụng Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
