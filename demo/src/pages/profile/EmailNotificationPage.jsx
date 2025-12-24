// src/pages/profile/EmailNotificationPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Bell, Save } from "lucide-react";

export function EmailNotificationPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    dailyWeather: true,
    weeklyForecast: true,
    rainAlert: true,
    journeyReminder: false,
    promotions: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    console.log("Saving notification settings:", settings);
    alert("Đã lưu cài đặt thông báo!");
  };

  const notificationOptions = [
    {
      key: "dailyWeather",
      icon: Mail,
      title: "Thời tiết hàng ngày",
      description: "Nhận email dự báo thời tiết mỗi sáng lúc 6:00 AM",
    },
    {
      key: "weeklyForecast",
      icon: Bell,
      title: "Dự báo tuần",
      description: "Tóm tắt thời tiết tuần tới mỗi Chủ nhật",
    },
    {
      key: "rainAlert",
      icon: Bell,
      title: "Cảnh báo mưa",
      description: "Thông báo khẩn cấp khi có mưa to hoặc bão",
    },
    {
      key: "journeyReminder",
      icon: Bell,
      title: "Nhắc nhở hành trình",
      description: "Nhắc nhở trước khi chuyến đi bắt đầu",
    },
    {
      key: "promotions",
      icon: Mail,
      title: "Ưu đãi & Khuyến mãi",
      description: "Nhận thông tin về gói Premium và ưu đãi đặc biệt",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Quay lại hồ sơ
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Email & Thông báo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý cách bạn nhận thông báo
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {notificationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.key}
                  className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Icon
                        className="text-blue-600 dark:text-blue-400"
                        size={24}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white mb-1">
                        {option.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSetting(option.key)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      settings[option.key]
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                        settings[option.key] ? "translate-x-7" : "translate-x-1"
                      }`}
                    ></div>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSave}
              className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Lưu thay đổi
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
