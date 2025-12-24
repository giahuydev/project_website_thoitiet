import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CommunityPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!user) return alert("Vui lòng đăng nhập!");
    if (!content.trim()) return;

    setIsPosting(true);
    try {
      await api.community.createPost({
        noiDung: content,
        idNguoiDung: user.idNguoiDung,
        hinhAnh: [] // Xử lý upload ảnh sau nếu cần
      });
      alert("Đăng bài thành công!");
      setContent("");
      // Reload posts here if GET api exists
    } catch (error) {
      console.error("Lỗi đăng bài:", error);
      alert("Đăng bài thất bại");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#121212] text-gray-900 dark:text-white min-h-screen">
      <main className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 lg:p-8">
        
        {/* Sidebar Left */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-50 dark:bg-[#181818] rounded-lg p-2">
             <nav className="flex flex-col gap-2">
                <button onClick={() => navigate("/")} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#282828] rounded-md font-bold text-gray-600 dark:text-gray-300">
                   🏠 Trang chủ
                </button>
                <button className="flex items-center gap-4 px-4 py-3 bg-gray-200 dark:bg-[#282828] rounded-md font-bold">
                   🌐 Cộng đồng
                </button>
             </nav>
          </div>
        </aside>

        {/* Center Feed */}
        <section className="col-span-1 lg:col-span-6 flex flex-col gap-6">
          {/* Create Post Box */}
          <div className="bg-gray-50 dark:bg-[#181818] rounded-lg p-4 border border-gray-200 dark:border-[#282828]">
            <div className="flex gap-4">
              <div className="bg-blue-500 rounded-full size-10 shrink-0"></div>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white resize-none min-h-[50px]"
                placeholder={`Bạn đang nghĩ gì, ${user?.hoTen || 'bạn'}?`}
              ></textarea>
            </div>
            <div className="flex justify-end mt-3 pt-2 border-t border-gray-200 dark:border-[#282828]">
              <button 
                onClick={handlePost}
                disabled={isPosting}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm transition-all disabled:opacity-50"
              >
                {isPosting ? "Đang đăng..." : "Đăng bài"}
              </button>
            </div>
          </div>

          {/* Post List (Placeholder - Cần thêm API GET Posts vào api.js để hiển thị thật) */}
          <article className="bg-gray-50 dark:bg-[#181818] rounded-lg p-4">
             <p className="text-center text-gray-500">Danh sách bài viết sẽ hiển thị tại đây.</p>
          </article>
        </section>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
           <div className="bg-gray-50 dark:bg-[#181818] rounded-lg p-5">
              <h3 className="font-bold mb-4">Xu hướng</h3>
              <p className="text-sm text-gray-500">#BãoYagi</p>
              <p className="text-sm text-gray-500">#MuaThuHaNoi</p>
           </div>
        </aside>

      </main>
    </div>
  );
}