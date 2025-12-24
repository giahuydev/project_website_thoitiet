// src/pages/CommunityPage.jsx
import { useNavigate } from "react-router-dom";

export default function CommunityPage() {
  const navigate = useNavigate();

  const handleBaiVietDaLuu = () => {
    navigate("/saved");
  };

  return (
    <div className="bg-white dark:bg-[#121212] text-gray-900 dark:text-white font-sans antialiased min-h-screen selection:bg-blue-500 dark:selection:bg-[#1DB954] selection:text-white dark:selection:text-black transition-colors duration-300">
      {/* Main Layout */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 lg:p-8">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-50 dark:bg-[#121212] rounded-lg p-2 transition-colors duration-300">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#181818] rounded-md transition-all font-bold"
              >
                <span className="text-xl">🏠</span>
                Trang chủ
              </button>
              <button className="flex items-center gap-4 px-4 py-3 text-gray-900 dark:text-white bg-gray-200 dark:bg-[#282828] rounded-md transition-all font-bold">
                <span className="text-xl text-blue-500 dark:text-[#1DB954]">
                  🌐
                </span>
                Cộng đồng
              </button>
              <button
                onClick={handleBaiVietDaLuu}
                className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#181818] rounded-md transition-all font-bold"
              >
                <span className="text-xl">📌</span>
                Đã lưu
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#181818] rounded-md transition-all font-bold"
              >
                <span className="text-xl">👤</span>
                Hồ sơ của tôi
              </button>
            </nav>
          </div>

          <hr className="border-gray-200 dark:border-[#282828] mx-2 transition-colors duration-300" />

          {/* Tags / Topics */}
          <div className="px-2">
            <h3 className="px-2 text-xs font-bold text-gray-600 dark:text-[#B3B3B3] uppercase mb-4 tracking-wider transition-colors duration-300">
              Chủ đề phổ biến
            </h3>
            <div className="flex flex-wrap gap-2">
              {["#BãoYagi", "#HoàngHôn", "#MùaThuHàNội", "#DãNgoại"].map(
                (tag, idx) => (
                  <a
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#242424] text-xs font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a] border border-transparent hover:border-blue-500 dark:hover:border-[#1DB954] transition-all cursor-pointer"
                    href="#"
                  >
                    {tag}
                  </a>
                )
              )}
            </div>
          </div>
        </aside>

        {/* Center Feed */}
        <section className="col-span-1 lg:col-span-6 flex flex-col gap-6">
          {/* Composer (New Post) */}
          <div className="bg-gray-50 dark:bg-[#181818] rounded-lg p-4 border border-gray-200 dark:border-[#282828] transition-colors duration-300">
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full size-10 shrink-0"></div>
              <div className="flex-1">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#727272] text-base resize-none min-h-[50px] transition-colors duration-300"
                  placeholder="Bạn đang nghĩ gì về thời tiết hôm nay?"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200 dark:border-[#282828] transition-colors duration-300">
              <div className="flex gap-1">
                <button className="p-2 rounded-full text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors">
                  <span className="text-xl">🖼️</span>
                </button>
                <button className="p-2 rounded-full text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors">
                  <span className="text-xl">📍</span>
                </button>
              </div>
              <button className="bg-blue-500 dark:bg-[#1DB954] hover:scale-105 hover:brightness-110 text-white dark:text-black text-sm font-bold px-6 py-2 rounded-full transition-all">
                Đăng bài
              </button>
            </div>
          </div>

          {/* Filters (Pills) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-300">
              Tất cả
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-[#242424] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-full text-sm font-medium whitespace-nowrap transition-colors">
              Ảnh đẹp
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-[#242424] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-white rounded-full text-sm font-medium whitespace-nowrap transition-colors">
              Cảnh báo
            </button>
          </div>

          {/* Post Card 1 */}
          <article className="bg-gray-50 dark:bg-[#181818] hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors duration-300 rounded-lg p-4 group border border-transparent hover:border-gray-200 dark:hover:border-[#ffffff10] cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-full size-10"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900 dark:text-white font-bold text-sm hover:underline transition-colors duration-300">
                      Minh Hoàng
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-[#B3B3B3] text-xs mt-0.5 transition-colors duration-300">
                    <span>2 giờ trước</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">Hà Nội</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="text-xl">⋯</span>
              </button>
            </div>

            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                Cơn dông đang kéo đến khu vực Cầu Giấy ⛈️
              </h2>
              <p className="text-gray-600 dark:text-[#B3B3B3] text-sm leading-relaxed transition-colors duration-300">
                Mây đen đang kéo đến rất nhanh, gió giật mạnh. Mọi người ra
                đường nhớ mang theo áo mưa và cẩn thận cây đổ nhé!
              </p>
            </div>

            <div className="w-full aspect-video bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 rounded-md mb-4 shadow-lg flex items-center justify-center transition-colors duration-300">
              <span className="text-6xl">🌩️</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <button className="group flex items-center gap-2 text-gray-600 dark:text-[#B3B3B3] hover:text-blue-500 dark:hover:text-[#1DB954] transition-colors">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    ❤️
                  </span>
                  <span className="text-sm font-bold">124</span>
                </button>
                <button className="group flex items-center gap-2 text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white transition-colors">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    🔗
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Post Card 2 */}
          <article className="bg-gray-50 dark:bg-[#181818] hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors duration-300 rounded-lg p-4 group border border-transparent hover:border-gray-200 dark:hover:border-[#ffffff10] cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-pink-400 to-orange-500 rounded-full size-10"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900 dark:text-white font-bold text-sm hover:underline transition-colors duration-300">
                      Lan Anh
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-[#B3B3B3] text-xs mt-0.5 transition-colors duration-300">
                    <span>5 giờ trước</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">Đà Lạt</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="text-xl">⋯</span>
              </button>
            </div>

            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                Săn mây sáng sớm tại đồi Đa Phú ☁️
              </h2>
              <p className="text-gray-600 dark:text-[#B3B3B3] text-sm leading-relaxed transition-colors duration-300">
                Không khí trong lành, nhiệt độ 16°C. Một buổi sáng tuyệt vời để
                bắt đầu ngày mới!
              </p>
            </div>

            <div className="w-full aspect-[4/3] bg-gradient-to-br from-blue-200 to-cyan-100 dark:from-blue-400 dark:to-cyan-300 rounded-md mb-4 shadow-lg flex items-center justify-center transition-colors duration-300">
              <span className="text-7xl">⛅</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <button className="group flex items-center gap-2 text-blue-500 dark:text-[#1DB954] transition-colors">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    💚
                  </span>
                  <span className="text-sm font-bold">856</span>
                </button>
                <button className="group flex items-center gap-2 text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white transition-colors">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    🔗
                  </span>
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* Right Sidebar (Trending) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-50 dark:bg-[#181818] rounded-lg p-5 transition-colors duration-300">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg transition-colors duration-300">
                Xu hướng
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { tag: "#BãoSố3", count: "15.4K", type: "Đang nổi" },
                { tag: "#Camping", count: "5.2K", type: "Hoạt động" },
                { tag: "#GoldenHour", count: "32K", type: "Nhiếp ảnh" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group cursor-pointer hover:bg-gray-100 dark:hover:bg-[#282828] p-2 -mx-2 rounded-md transition-colors"
                >
                  <div>
                    <p className="text-xs text-gray-600 dark:text-[#B3B3B3] transition-colors duration-300">
                      {item.type}
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-[#1DB954] transition-colors">
                      {item.tag}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-[#727272] transition-colors duration-300">
                      {item.count} bài viết
                    </p>
                  </div>
                  <span className="text-xl">📈</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#181818] rounded-lg p-5 transition-colors duration-300">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 transition-colors duration-300">
              Gợi ý theo dõi
            </h3>
            <div className="space-y-4">
              {[
                { name: "Trung tâm Khí tượng", handle: "@kttv_vn" },
                { name: "Hội Nhiếp Ảnh", handle: "@photo_daily" },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full size-10 shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate hover:underline cursor-pointer transition-colors duration-300">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-[#B3B3B3] truncate transition-colors duration-300">
                      {user.handle}
                    </p>
                  </div>
                  <button className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-[#1DB954] hover:scale-105 transition-all">
                    <span className="text-xl">➕</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-600 dark:text-[#B3B3B3] px-2 transition-colors duration-300">
            <a className="hover:underline" href="#">
              Điều khoản
            </a>
            <a className="hover:underline" href="#">
              Quyền riêng tư
            </a>
            <span>© 2024 WeatherApp</span>
          </div>
        </aside>
      </main>
    </div>
  );
}
