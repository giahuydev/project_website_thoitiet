import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Crown, Mail, Calendar, Home } from "lucide-react";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const paymentInfo = location.state || {
    plan: { name: "Premium", price: "59.000đ" },
    total: 59000,
    orderId: "ORD12345",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle className="text-white" size={48} />
            </div>
          </div>

          <h1 className="text-4xl font-black text-gray-900 dark:text-white mt-6 mb-2">
            Thanh toán thành công! 🎉
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Chào mừng bạn đến với gói Premium
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 mb-6">
          {/* Order Info */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Mã đơn hàng
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {paymentInfo.orderId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Số tiền
              </p>
              <p className="text-2xl font-black text-green-600 dark:text-green-400">
                {paymentInfo.total.toLocaleString()}đ
              </p>
            </div>
          </div>

          {/* Plan Info */}
          <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Crown className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                Gói {paymentInfo.plan.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đã kích hoạt thành công
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Bước tiếp theo:
            </h3>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Mail className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-1">
                  Kiểm tra email
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hóa đơn và thông tin kích hoạt đã được gửi đến email của bạn
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Crown
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-1">
                  Trải nghiệm Premium
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bắt đầu sử dụng tất cả tính năng Premium ngay bây giờ
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Calendar
                  className="text-green-600 dark:text-green-400"
                  size={20}
                />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-1">
                  Gia hạn tự động
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gói của bạn sẽ tự động gia hạn vào ngày{" "}
                  {new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Về trang chủ
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex-1 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
          >
            Xem hồ sơ
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cần hỗ trợ?{" "}
            <a
              href="mailto:support@weatherapp.com"
              className="text-purple-600 dark:text-purple-400 hover:underline font-bold"
            >
              Liên hệ chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
