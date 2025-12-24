import { Check, Crown, Zap, Mail, MapPin, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PremiumPage() {
  const navigate = useNavigate();

  const handleUpgrade = (plan) => {
    navigate("/checkout", { state: { plan } });
  };

  const plans = [
    {
      name: "Free",
      price: "0đ",
      period: "/tháng",
      description: "Dùng thử miễn phí",
      features: [
        { text: "5 lần tra cứu thời tiết/ngày", included: true },
        { text: "1 lịch trình/tuần", included: true },
        { text: "Email thông báo cơ bản", included: false },
        { text: "Dự báo chi tiết 7 ngày", included: false },
        { text: "Cảnh báo thời tiết khẩn cấp", included: false },
        { text: "Phân tích đa nguồn", included: false },
      ],
      buttonText: "Gói hiện tại",
      buttonStyle: "bg-gray-300 text-gray-700 cursor-not-allowed",
      disabled: true,
    },
    {
      name: "Premium",
      price: "59.000đ",
      period: "/tháng",
      description: "Cho người dùng thường xuyên",
      popular: true,
      features: [
        "Tra cứu không giới hạn",
        "Tạo vô hạn lịch trình",
        "Email thông báo thời tiết hàng ngày",
        "Dự báo chi tiết 14 ngày",
        "Cảnh báo thời tiết khẩn cấp",
      ],
      buttonText: "Nâng cấp Premium",
      buttonStyle:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl",
      disabled: false,
    },
    {
      name: "Pro",
      price: "659.000đ",
      period: "/năm",
      description: "Cho doanh nghiệp & chuyên gia",
      features: [
        "Tra cứu không giới hạn",
        "Tạo vô hạn lịch trình",
        "Email thông báo tùy chỉnh",
        "Dự báo chi tiết 30 ngày",
        "Cảnh báo ưu tiên realtime",
        "Phân tích đa nguồn (API)",
      ],
      buttonText: "Nâng cấp Pro",
      buttonStyle:
        "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl",
      disabled: false,
    },
  ];

  const benefits = [
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      title: "Tra cứu không giới hạn",
      description: "Kiểm tra thời tiết bất cứ lúc nào, không lo bị giới hạn",
    },
    {
      icon: <MapPin className="text-emerald-500" size={32} />,
      title: "Vô hạn lịch trình",
      description:
        "Lập kế hoạch cho mọi chuyến đi, từ du lịch đến công việc hàng ngày",
    },
    {
      icon: <Mail className="text-blue-500" size={32} />,
      title: "Email thông báo hàng ngày",
      description:
        "Nhận dự báo thời tiết chi tiết mỗi sáng, không bao giờ bỏ lỡ",
    },
    {
      icon: <TrendingUp className="text-purple-500" size={32} />,
      title: "Dự báo dài hạn",
      description: "Xem trước thời tiết 14-30 ngày, lên kế hoạch dài hạn",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-block mb-6">
            <Crown className="text-yellow-500" size={64} />
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Nâng cấp lên{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Premium
            </span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Trải nghiệm đầy đủ sức mạnh của WeatherApp với tra cứu không giới
            hạn, lập kế hoạch chi tiết và thông báo thời tiết hàng ngày
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleUpgrade(plans[1])}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Bắt đầu dùng thử 7 ngày miễn phí
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            >
              Tiếp tục dùng Free
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Lợi ích khi nâng cấp Premium
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Chọn gói phù hợp với bạn
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Hủy bất cứ lúc nào, không mất phí
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border-2 transition-all hover:shadow-2xl ${
                plan.popular
                  ? "border-purple-500 transform scale-105"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Phổ biến nhất
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => {
                  const isIncluded =
                    typeof feature === "string" || feature.included;
                  const text =
                    typeof feature === "string" ? feature : feature.text;

                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isIncluded
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {isIncluded ? (
                          <Check className="text-green-600" size={14} />
                        ) : (
                          <span className="text-gray-400">✕</span>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isIncluded
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500 dark:text-gray-500 line-through"
                        }`}
                      >
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={() => !plan.disabled && handleUpgrade(plan)}
                disabled={plan.disabled}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Câu hỏi thường gặp
        </h2>

        <div className="space-y-6">
          {[
            {
              q: "Tôi có thể hủy bất cứ lúc nào không?",
              a: "Có, bạn có thể hủy bất cứ lúc nào mà không mất phí. Gói Premium sẽ còn hiệu lực đến hết chu kỳ thanh toán.",
            },
            {
              q: "Email thông báo được gửi lúc nào?",
              a: "Email thông báo thời tiết sẽ được gửi mỗi sáng lúc 6:00 AM theo múi giờ của bạn. Bạn có thể tùy chỉnh thời gian trong cài đặt.",
            },
            {
              q: "Tôi có thể dùng thử trước không?",
              a: "Có! Chúng tôi cung cấp 7 ngày dùng thử miễn phí gói Premium. Không cần thẻ tín dụng.",
            },
            {
              q: "Premium khác gì so với Free?",
              a: "Premium cho phép tra cứu không giới hạn, tạo vô hạn lịch trình, nhận email thông báo hàng ngày và dự báo chi tiết 14 ngày.",
            },
          ].map((faq, index) => (
            <details
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group"
            >
              <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-purple-500 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <Crown className="mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-4">
            Sẵn sàng trải nghiệm Premium?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bắt đầu ngay với 7 ngày dùng thử miễn phí
          </p>
          <button
            onClick={() => handleUpgrade(plans[1])}
            className="px-12 py-4 bg-white text-purple-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Bắt đầu dùng thử
          </button>
        </div>
      </section>
    </div>
  );
}
