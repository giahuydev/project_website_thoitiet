import { useState } from "react";
import { 
  Calendar, Clock, Coffee, Tent, Camera, Bike, MapPin, Mail, 
  Plus, X, Loader 
} from "lucide-react";
import PremiumBanner from "../components/PremiumBanner";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SchedulePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // --- STATE ---
  const [loading, setLoading] = useState(false);
  
  // State cho UI "Hoạt động"
  const [customActivity, setCustomActivity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("cafe");
  
  // State dữ liệu Form
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState("08:00");
  // Mặc định chọn ngày mai để tránh lỗi @Future của Backend
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [eventDate, setEventDate] = useState(tomorrow.toISOString().split('T')[0]);
  
  const [enableEmailNotification, setEnableEmailNotification] = useState(true);
  const [notifyBefore, setNotifyBefore] = useState(30);

  const activities = [
    { id: "cafe", icon: Coffee, title: "Cafe Sáng", desc: "Chill nhẹ nhàng" },
    { id: "camping", icon: Tent, title: "Cắm trại", desc: "Hòa mình với thiên nhiên" },
    { id: "photo", icon: Camera, title: "Chụp ảnh", desc: "Cần thời tiết đẹp" },
    { id: "travel", icon: Bike, title: "Dạo phố", desc: "Vi vu hóng gió" },
  ];

  // --- LOGIC UI ---
  const handleAddCustomActivity = () => {
    if (customActivity.trim()) {
      setSelectedActivity("custom");
      setShowCustomInput(false);
    }
  };
  const formatToLocalISO = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = "00"; // Luôn set giây là 00 cho gọn
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  // --- LOGIC XỬ LÝ DỮ LIỆU (QUAN TRỌNG) ---
  const handleSubmit = async () => {
    // 1. Validate cơ bản
    if (!user) return alert("Vui lòng đăng nhập để tạo lịch!");
    if (!location || !eventDate || !eventTime) return alert("Vui lòng nhập đầy đủ thông tin!");

    setLoading(true);
    try {
      // 2. Lấy tên sự kiện
      const activityTitle = selectedActivity === 'custom' 
        ? customActivity 
        : activities.find(a => a.id === selectedActivity)?.title;

      if (!activityTitle) {
        setLoading(false);
        return alert("Vui lòng chọn hoặc nhập tên hoạt động!");
      }

      // 3. Xử lý thời gian AN TOÀN (Dùng Date Object để tính toán, sau đó format thủ công)
      // Tạo đối tượng Date cho thời gian bắt đầu
      const startObj = new Date(`${eventDate}T${eventTime}:00`);
      
      // Tạo đối tượng Date cho thời gian kết thúc (Cộng 2 tiếng)
      const endObj = new Date(startObj.getTime() + 2 * 60 * 60 * 1000); 

      // 4. Tạo Payload
      const payload = {
        tenSuKien: activityTitle,
        ngayGio: formatToLocalISO(startObj),         // Chuỗi: "2025-12-25T08:00:00"
        thoiGianKetThuc: formatToLocalISO(endObj),   // Chuỗi: "2025-12-25T10:00:00"
        diaDiem: location,
        ghiChu: `Hoạt động: ${activityTitle} tại ${location}`,
        nhacNhos: [] // Gửi mảng rỗng để an toàn nhất lúc này
      };

      console.log("📤 Payload chính xác:", payload); // Kiểm tra log này!

      // 5. Gọi API
      const response = await api.schedule.create(user.idNguoiDung, payload);
      
      if (response.code === 1000 || response.result) {
        alert("✅ Tạo lịch trình thành công!");
        navigate("/journey");
      } else {
        // Nếu server trả về message lỗi trong result
        throw new Error(response.message || "Lỗi server trả về");
      }
    } catch (error) {
      console.error("❌ Chi tiết lỗi:", error);
      
      // Cố gắng đọc message từ Backend trả về (nằm trong response.data)
      let errorMessage = error.message;
      if (error.response && error.response.data) {
          // Backend Spring Boot thường trả về lỗi validation trong message hoặc errors
          errorMessage = error.response.data.message || JSON.stringify(error.response.data);
      }
      
      alert(`❌ Thất bại: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
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

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Form Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* STEP 1: HOẠT ĐỘNG */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">1</span>
                Bạn định làm gì?
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {activities.map((activity) => {
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
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isActive
                            ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                        }`}>
                        <activity.icon size={24} />
                      </div>
                      <div className="text-left">
                        <p className={`font-bold ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}>
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.desc}</p>
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

              {/* Input Custom Activity */}
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
                    placeholder="Nhập tên hoạt động..."
                    className="flex-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
                    onKeyDown={(e) => e.key === "Enter" && handleAddCustomActivity()}
                    autoFocus
                  />
                  <button
                    onClick={handleAddCustomActivity}
                    className="px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-bold"
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
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-fadeIn">
                  <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ Đã chọn: <span className="font-bold">{customActivity}</span>
                  </p>
                </div>
              )}
            </section>

            {/* STEP 2: THỜI GIAN & ĐỊA ĐIỂM */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">2</span>
                Thời gian & Địa điểm
              </h2>
              <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Địa điểm</label>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                        <div className="p-4"><MapPin className="text-gray-400" size={20} /></div>
                        <input 
                            type="text" value={location} onChange={e => setLocation(e.target.value)}
                            placeholder="Nhập địa điểm (VD: Hồ Tây)..."
                            className="flex-1 p-4 bg-transparent outline-none text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Ngày</label>
                    <input 
                        type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Giờ bắt đầu</label>
                    <input 
                        type="time" value={eventTime} onChange={e => setEventTime(e.target.value)}
                        className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white outline-none"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">
                   * Lưu ý: Thời gian kết thúc sẽ được tự động tính (khoảng 2 tiếng sau giờ bắt đầu).
                </p>
              </div>
            </section>

            {/* STEP 3: THÔNG BÁO (UI Only - Logic backend tạm tắt để tránh lỗi 400) */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">3</span>
                    Thông báo qua Email
                </h2>
                <div className="space-y-4">
                   <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl">
                      <div className="flex gap-4 items-center">
                         <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                            <Mail className="text-blue-500" size={24} />
                         </div>
                         <div>
                            <p className="font-bold text-gray-900 dark:text-white">Nhận thông báo email</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Gửi cảnh báo thời tiết trước sự kiện</p>
                         </div>
                      </div>
                      <button onClick={() => setEnableEmailNotification(!enableEmailNotification)} className={`relative w-14 h-8 rounded-full transition-colors ${enableEmailNotification ? "bg-emerald-500" : "bg-gray-300"}`}>
                         <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${enableEmailNotification ? "translate-x-7" : "translate-x-1"}`}></div>
                      </button>
                   </div>
                   
                   {enableEmailNotification && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl animate-fadeIn">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Thông báo trước bao lâu?</label>
                        <div className="flex gap-2">
                          {[30, 60, 120, 240].map((minutes) => (
                            <button
                              key={minutes}
                              onClick={() => setNotifyBefore(minutes)}
                              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                                notifyBefore === minutes
                                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
                              }`}
                            >
                              {minutes >= 60 ? `${minutes / 60}h` : `${minutes}p`}
                            </button>
                          ))}
                        </div>
                      </div>
                   )}
                </div>
            </section>
          </div>

          {/* RIGHT COLUMN - SUMMARY */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tóm tắt</h3>
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                            {selectedActivity === 'custom' ? <Plus size={20}/> : <Coffee size={20}/>}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Hoạt động</p>
                            <p className="font-bold text-gray-900 dark:text-white">
                                {selectedActivity === 'custom' ? (customActivity || "Chưa nhập") : activities.find(a => a.id === selectedActivity)?.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Clock size={20}/></div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Thời gian</p>
                            <p className="font-bold text-gray-900 dark:text-white">{eventTime} - {eventDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600"><MapPin size={20}/></div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Địa điểm</p>
                            <p className="font-bold text-gray-900 dark:text-white">{location || "Chưa nhập"}</p>
                        </div>
                    </div>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.02] transition-all flex justify-center items-center gap-2"
                >
                  {loading ? <Loader className="animate-spin" /> : "TẠO LỊCH TRÌNH"}
                </button>
              </div>
              <PremiumBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}