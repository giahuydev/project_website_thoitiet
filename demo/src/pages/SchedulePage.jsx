import { useState } from "react";
import {
  Calendar,
  Clock,
  Coffee,
  Tent,
  Camera,
  Bike,
  MapPin,
  Mail,
  Droplets,
  Plus,
  X,
} from "lucide-react";
import PremiumBanner from "../components/PremiumBanner";

export default function SchedulePage() {
  const [customActivity, setCustomActivity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("cafe");
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState("08:00");
  const [eventDate, setEventDate] = useState("");
  const [enableEmailNotification, setEnableEmailNotification] = useState(true);
  const [notifyBefore, setNotifyBefore] = useState(30);

  const activities = [
    { id: "cafe", icon: Coffee, title: "Cafe Sáng", desc: "Chill nhẹ nhàng" },
    {
      id: "camping",
      icon: Tent,
      title: "Cắm trại",
      desc: "Hòa mình với thiên nhiên",
    },
    {
      id: "photo",
      icon: Camera,
      title: "Chụp ảnh",
      desc: "Cần thời tiết đẹp",
    },
    {
      id: "travel",
      icon: Bike,
      title: "Dạo phố",
      desc: "Vi vu hóng gió",
    },
  ];

  const handleAddCustomActivity = () => {
    if (customActivity.trim()) {
      setSelectedActivity("custom");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-emerald-500" size={32} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Lịch hoạt động & Thông báo
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Lên kế hoạch và nhận thông báo thời tiết qua email
          </p>
        </div>

        {/* Page Intro */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Lập kế hoạch thông minh
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Tạo lịch trình của bạn và nhận email thông báo thời tiết trước khi
              sự kiện diễn ra.
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {" "}
                Nếu dự báo mưa lớn, chúng tôi sẽ gửi cảnh báo sớm.
              </span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Choose Activity */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                Bạn định làm gì?
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {activities.map((activity) => {
                  const Icon = activity.icon;
                  const isActive = selectedActivity === activity.id;

                  return (
                    <button
                      key={activity.id}
                      onClick={() => setSelectedActivity(activity.id)}
                      className={`relative flex items-center gap-4 p-6 rounded-2xl transition-all border-2 ${
                        isActive
                          ? "bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border-emerald-500"
                          : "bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isActive
                            ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <Icon size={24} />
                      </div>
                      <div className="text-left">
                        <p
                          className={`font-bold ${
                            isActive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.desc}
                        </p>
                      </div>

                      {isActive && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Activity Input */}
              {!showCustomInput ? (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Thêm hoạt động tùy chỉnh
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customActivity}
                    onChange={(e) => setCustomActivity(e.target.value)}
                    placeholder="Nhập tên hoạt động của bạn..."
                    className="flex-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddCustomActivity()
                    }
                  />
                  <button
                    onClick={handleAddCustomActivity}
                    className="px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    Thêm
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomActivity("");
                    }}
                    className="px-4 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {selectedActivity === "custom" && customActivity && (
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ Đã chọn: {customActivity}
                  </p>
                </div>
              )}
            </section>

            {/* Step 2: Time & Location */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                Thời gian & Địa điểm
              </h2>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Địa điểm
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                    <div className="p-4">
                      <MapPin className="text-gray-400" size={20} />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Nhập địa điểm (VD: Hồ Tây, Đà Lạt...)"
                      className="flex-1 p-4 bg-transparent outline-none text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Chọn ngày
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Time Picker */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Giờ dự kiến
                    </label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                      <div className="p-4">
                        <Clock className="text-gray-400" size={20} />
                      </div>
                      <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="flex-1 p-4 bg-transparent outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Email Notifications */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                Thông báo qua Email
              </h2>

              <div className="space-y-4">
                {/* Toggle Email Notification */}
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Mail className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        Nhận thông báo email
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Gửi email thông báo thời tiết trước sự kiện
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setEnableEmailNotification(!enableEmailNotification)
                    }
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      enableEmailNotification
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                        enableEmailNotification
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Notify Before Time */}
                {enableEmailNotification && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Thông báo trước bao lâu?
                    </label>
                    <div className="flex gap-2">
                      {[30, 60, 120, 240].map((minutes) => (
                        <button
                          key={minutes}
                          onClick={() => setNotifyBefore(minutes)}
                          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                            notifyBefore === minutes
                              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                          }`}
                        >
                          {minutes >= 60 ? `${minutes / 60}h` : `${minutes}p`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warning on Rain */}
                <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                      <Droplets className="text-yellow-500" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-yellow-700 dark:text-yellow-400">
                        Cảnh báo mưa tự động
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-500">
                        Luôn bật - Gửi cảnh báo nếu dự báo mưa &gt;50%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Summary & Premium */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">
                  Tóm tắt kế hoạch
                </h3>

                <div className="space-y-5 mb-6 relative z-10">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 flex items-center justify-center">
                      {selectedActivity === "custom" ? (
                        <span className="text-2xl">📝</span>
                      ) : (
                        <Coffee
                          className="text-emerald-600 dark:text-emerald-400"
                          size={24}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-bold mb-1">
                        Hoạt động
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {selectedActivity === "custom"
                          ? customActivity || "Chưa đặt tên"
                          : activities.find((a) => a.id === selectedActivity)
                              ?.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                      <Clock
                        className="text-blue-600 dark:text-blue-400"
                        size={24}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-bold mb-1">
                        Thời gian
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {eventTime} - {eventDate || "Chưa chọn"}
                      </p>
                    </div>
                  </div>

                  {enableEmailNotification && (
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                        <Mail
                          className="text-green-600 dark:text-green-400"
                          size={24}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-bold mb-1">
                          Thông báo
                        </p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {notifyBefore >= 60
                            ? `${notifyBefore / 60} giờ trước`
                            : `${notifyBefore} phút trước`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] uppercase tracking-wide relative z-10">
                  Tạo lịch trình
                </button>
              </div>

              {/* Premium Banner */}
              <PremiumBanner />

              {/* Quick Tip */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">
                      Mẹo hay
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Đặt thông báo trước 2-4 giờ để có thời gian chuẩn bị thay
                      đổi kế hoạch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
