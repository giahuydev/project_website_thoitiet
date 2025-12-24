import { useNavigate } from "react-router-dom";

export default function PremiumBanner() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 p-5 rounded-2xl hover:shadow-lg transition-all">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">👑</span>
        <div>
          <p className="font-bold text-purple-700 dark:text-purple-400 mb-1">
            Nâng cấp Premium
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-300">
            Không giới hạn tra cứu & nhận thông báo hàng ngày
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/premium")}
        className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Xem gói Premium
      </button>
    </div>
  );
}
