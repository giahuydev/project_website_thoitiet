import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  Smartphone,
  Building2,
  Wallet,
  Crown,
} from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin gói từ navigation state
  const selectedPlan = location.state?.plan || {
    name: "Premium",
    price: "59.000đ",
    period: "/tháng",
    features: [
      "Tra cứu không giới hạn",
      "Tạo vô hạn lịch trình",
      "Email thông báo thời tiết hàng ngày",
      "Dự báo chi tiết 14 ngày",
    ],
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    couponCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const paymentMethods = [
    {
      id: "vnpay",
      name: "VNPay QR",
      icon: <CreditCard size={24} />,
      description: "Quét mã QR để thanh toán",
    },
    {
      id: "momo",
      name: "Ví MoMo",
      icon: <Wallet size={24} />,
      description: "Thanh toán qua ví MoMo",
    },
    {
      id: "banking",
      name: "Chuyển khoản",
      icon: <Building2 size={24} />,
      description: "Chuyển khoản ngân hàng",
    },
    {
      id: "card",
      name: "Thẻ ATM/Visa",
      icon: <CreditCard size={24} />,
      description: "Thanh toán bằng thẻ",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyCoupon = () => {
    // Giả lập kiểm tra mã giảm giá
    if (formData.couponCode.toUpperCase() === "WEATHER20") {
      setCouponApplied(true);
      setDiscount(20);
    } else if (formData.couponCode) {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  const calculateTotal = () => {
    const basePrice = parseInt(selectedPlan.price.replace(/[^\d]/g, ""));
    const discountAmount = (basePrice * discount) / 100;
    return basePrice - discountAmount;
  };

  const handleCheckout = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!agreeTerms) {
      alert("Vui lòng đồng ý với điều khoản sử dụng!");
      return;
    }

    // Giả lập chuyển đến VNPay payment gateway
    console.log("Processing payment with:", {
      formData,
      paymentMethod,
      plan: selectedPlan,
      total: calculateTotal(),
    });

    // Trong thực tế, bạn sẽ gọi API backend để tạo payment URL
    // Sau đó redirect đến VNPay
    alert("Đang chuyển đến cổng thanh toán VNPay...");

    // Giả lập thanh toán thành công
    setTimeout(() => {
      navigate("/payment-success", {
        state: {
          plan: selectedPlan,
          total: calculateTotal(),
          orderId: "ORD" + Date.now(),
        },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Quay lại
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Thanh toán
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Hoàn tất thanh toán để kích hoạt gói Premium
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                Thông tin khách hàng
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0912345678"
                      className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                Phương thức thanh toán
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`relative flex items-start gap-4 p-4 rounded-xl transition-all border-2 text-left ${
                      paymentMethod === method.id
                        ? "bg-purple-50 dark:bg-purple-900/20 border-purple-500"
                        : "bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === method.id
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-bold ${
                          paymentMethod === method.id
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {method.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {method.description}
                      </p>
                    </div>

                    {paymentMethod === method.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Payment Method Details */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Smartphone
                    className="text-blue-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div className="text-sm">
                    <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">
                      {paymentMethod === "vnpay" && "Thanh toán qua VNPay QR"}
                      {paymentMethod === "momo" && "Thanh toán qua ví MoMo"}
                      {paymentMethod === "banking" && "Chuyển khoản ngân hàng"}
                      {paymentMethod === "card" && "Thanh toán bằng thẻ"}
                    </p>
                    <p className="text-blue-600 dark:text-blue-300">
                      {paymentMethod === "vnpay" &&
                        "Bạn sẽ được chuyển đến trang VNPay để quét mã QR thanh toán"}
                      {paymentMethod === "momo" &&
                        "Bạn sẽ được chuyển đến ứng dụng MoMo để xác nhận thanh toán"}
                      {paymentMethod === "banking" &&
                        "Thông tin chuyển khoản sẽ hiển thị sau khi xác nhận"}
                      {paymentMethod === "card" &&
                        "Nhập thông tin thẻ ATM hoặc Visa/Mastercard"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-5 h-5 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Tôi đồng ý với{" "}
                  <a
                    href="#"
                    className="text-purple-600 dark:text-purple-400 hover:underline font-bold"
                  >
                    Điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a
                    href="#"
                    className="text-purple-600 dark:text-purple-400 hover:underline font-bold"
                  >
                    Chính sách hoàn tiền
                  </a>
                  . Gói Premium sẽ tự động gia hạn hàng tháng.
                </span>
              </label>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Tóm tắt đơn hàng
                </h3>

                {/* Plan Info */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Crown className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      Gói {selectedPlan.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedPlan.period}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Tính năng bao gồm:
                  </p>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <CheckCircle className="text-green-500" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Giá gói</span>
                    <span className="font-bold">{selectedPlan.price}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Giảm giá ({discount}%)</span>
                      <span className="font-bold">
                        -
                        {parseInt(selectedPlan.price.replace(/[^\d]/g, "")) *
                          (discount / 100)}
                        đ
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span>Tổng thanh toán</span>
                    <span className="text-purple-600 dark:text-purple-400">
                      {calculateTotal().toLocaleString()}đ
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={!agreeTerms}
                  className={`w-full mt-6 py-4 rounded-2xl font-bold transition-all ${
                    agreeTerms
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl hover:scale-[1.02]"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Xác nhận và thanh toán
                </button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  Bạn sẽ được chuyển đến cổng thanh toán an toàn
                </p>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-3">
                  <Shield
                    className="text-green-600 dark:text-green-400"
                    size={24}
                  />
                  <h4 className="font-bold text-green-700 dark:text-green-400">
                    Thanh toán an toàn 100%
                  </h4>
                </div>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Thông tin của bạn được mã hóa và bảo mật tuyệt đối
                </p>
                <div className="flex gap-2 mt-4">
                  <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300">
                    SSL 256-bit
                  </div>
                  <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300">
                    PCI DSS
                  </div>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">
                      Hoàn tiền trong 7 ngày
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Nếu không hài lòng, chúng tôi sẽ hoàn lại 100% số tiền
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
