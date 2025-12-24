import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function WeatherChart({ data }) {
  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = data.map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      time: `${date.getHours()}:00`,
      temp: item.main.temp,
      // [QUAN TRỌNG] Đọc thẳng biến rain (đã là số)
      rain: item.rain, 
    };
  });

  return (
    <div className="space-y-8">
      {/* Biểu đồ Nhiệt độ */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          📈 Nhiệt độ 24 giờ
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <YAxis stroke="#9CA3AF" unit="°C" fontSize={12} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#fff" }} />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#3B82F6" strokeWidth={3} name="Nhiệt độ" dot={{r:4}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ Mưa */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🌧️ Lượng mưa 24 giờ (mm)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <YAxis stroke="#9CA3AF" unit="mm" fontSize={12} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#fff" }} cursor={{fill: 'rgba(255,255,255,0.1)'}} />
            <Legend />
            {/* dataKey phải khớp với biến rain ở trên */}
            <Bar dataKey="rain" fill="#06B6D4" name="Lượng mưa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}