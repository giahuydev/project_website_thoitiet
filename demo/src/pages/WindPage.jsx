// src/pages/WindPage.jsx
export default function WindPage() {
  return (
    <div className="bg-white dark:bg-[#121212] text-gray-900 dark:text-white font-sans antialiased min-h-screen flex flex-col overflow-hidden selection:bg-blue-500 dark:selection:bg-[#1DB954] selection:text-white dark:selection:text-black transition-colors duration-300">
      {/* MAIN CONTENT */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* --- LEFT: MAIN MAP --- */}
        <div className="flex-1 relative bg-gray-100 dark:bg-[#0e1217] overflow-hidden group transition-colors duration-300">
          {/* Dark Map Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-50 transition-opacity duration-300"
            style={{
              backgroundImage:
                'url("https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/105.8342,21.0278,10/1200x800@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw")',
              filter: "grayscale(100%) invert(100%) brightness(0.4)",
            }}
          ></div>

          {/* Wind Particles Simulation (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-60 mix-blend-screen transition-opacity duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="windGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(59, 130, 246, 0)"
                  className="dark:stop-color-[rgba(29,185,84,0)]"
                />
                <stop
                  offset="50%"
                  stopColor="#3b82f6"
                  className="dark:stop-color-[#1DB954]"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(59, 130, 246, 0)"
                  className="dark:stop-color-[rgba(29,185,84,0)]"
                />
              </linearGradient>
            </defs>
            {/* Simulated Wind Lines */}
            {[...Array(20)].map((_, i) => (
              <path
                key={i}
                d={`M ${Math.random() * 1000} ${Math.random() * 800} Q ${
                  Math.random() * 1000 + 100
                } ${Math.random() * 800 + 50} ${Math.random() * 1000 + 200} ${
                  Math.random() * 800
                }`}
                fill="none"
                stroke="url(#windGradient)"
                strokeWidth="2"
                strokeDasharray="100 200"
                className="animate-pulse"
                style={{ animationDuration: `${Math.random() * 2 + 1}s` }}
              />
            ))}
          </svg>

          {/* Floating Info */}
          <div className="absolute top-6 left-6 z-10">
            <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter drop-shadow-2xl transition-colors duration-300">
              24{" "}
              <span className="text-3xl text-blue-500 dark:text-[#1DB954]">
                km/h
              </span>
            </h1>
            <p className="text-gray-600 dark:text-[#B3B3B3] font-bold uppercase tracking-widest mt-1 transition-colors duration-300">
              Đông Đông Nam
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-gray-200 dark:bg-[#282828] rounded text-[10px] text-gray-900 dark:text-white font-bold border border-gray-300 dark:border-[#404040] transition-colors duration-300">
                GFS Model
              </span>
              <span className="px-2 py-0.5 bg-gray-200 dark:bg-[#282828] rounded text-[10px] text-gray-900 dark:text-white font-bold border border-gray-300 dark:border-[#404040] transition-colors duration-300">
                Surface
              </span>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="size-12 bg-blue-500 dark:bg-[#1DB954] text-white dark:text-black rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300">
              📍
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR --- */}
        <aside className="w-[350px] bg-gray-50 dark:bg-[#121212] border-l border-gray-200 dark:border-[#282828] flex flex-col z-10 shrink-0 transition-colors duration-300">
          {/* 1. Compass / Direction */}
          <div className="p-6 flex flex-col items-center border-b border-gray-200 dark:border-[#282828] transition-colors duration-300">
            <div className="relative size-48 rounded-full bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#282828] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300">
              {/* Compass Ticks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-full h-full flex justify-center pt-2 text-[10px] font-bold text-gray-400 dark:text-[#535353] transition-colors duration-300"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  I
                </div>
              ))}
              {/* N E S W Labels */}
              <span className="absolute top-2 text-blue-500 dark:text-[#1DB954] font-bold text-xs transition-colors duration-300">
                N
              </span>
              <span className="absolute bottom-2 text-gray-500 dark:text-[#727272] font-bold text-xs transition-colors duration-300">
                S
              </span>
              <span className="absolute left-2 text-gray-500 dark:text-[#727272] font-bold text-xs transition-colors duration-300">
                W
              </span>
              <span className="absolute right-2 text-gray-500 dark:text-[#727272] font-bold text-xs transition-colors duration-300">
                E
              </span>

              {/* Wind Direction Arrow */}
              <div
                className="absolute w-1 h-24 bg-gradient-to-t from-transparent to-blue-500 dark:to-[#1DB954] rounded-full origin-bottom top-[50%] -mt-24 shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_#1DB954] transition-all duration-300"
                style={{ transform: "rotate(110deg) translateY(-50%)" }}
              ></div>

              {/* Center Knob */}
              <div className="absolute size-16 rounded-full bg-gray-100 dark:bg-[#242424] border border-gray-300 dark:border-[#333] flex items-center justify-center z-10 shadow-xl transition-colors duration-300">
                <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  110°
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600 dark:text-[#B3B3B3] uppercase tracking-wider font-bold transition-colors duration-300">
                Gió giật
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                45 km/h
              </p>
            </div>
          </div>

          {/* 2. Altitude Selector */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-900 dark:text-white font-bold text-sm transition-colors duration-300">
                Độ cao (Altitude)
              </h3>
              <span className="text-blue-500 dark:text-[#1DB954] text-xs font-bold bg-blue-50 dark:bg-[#1DB954]/10 px-2 py-1 rounded transition-colors duration-300">
                Bề mặt
              </span>
            </div>

            <div className="flex-1 flex gap-2 overflow-y-auto">
              {/* Vertical Slider Bar */}
              <div className="w-12 bg-white dark:bg-[#181818] rounded-full relative flex flex-col justify-between items-center py-2 border border-gray-200 dark:border-[#282828] transition-colors duration-300">
                <div className="absolute inset-x-0 bottom-0 bg-gray-100 dark:bg-[#242424] rounded-full h-[30%] transition-all duration-300"></div>
                <div className="size-8 rounded-full bg-blue-500 dark:bg-[#1DB954] shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(29,185,84,0.5)] absolute bottom-[30%] left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-10 flex items-center justify-center transition-colors duration-300">
                  <div className="w-4 h-0.5 bg-black/50 rounded-full"></div>
                </div>
              </div>

              {/* Labels */}
              <div className="flex-1 flex flex-col justify-between py-2 text-xs font-bold text-gray-400 dark:text-[#535353] transition-colors duration-300">
                <button className="text-left px-2 py-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                  10 km (Jet Stream)
                </button>
                <button className="text-left px-2 py-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                  500 hPa
                </button>
                <button className="text-left px-2 py-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                  850 hPa
                </button>
                <button className="text-left px-2 py-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                  100 m
                </button>
                <button className="text-left px-2 py-1 text-gray-900 dark:text-white bg-gray-100 dark:bg-[#242424] rounded transition-colors border-l-2 border-blue-500 dark:border-[#1DB954]">
                  Bề mặt (Surface)
                </button>
              </div>
            </div>
          </div>

          {/* 3. Model Selector */}
          <div className="p-4 border-t border-gray-200 dark:border-[#282828] transition-colors duration-300">
            <p className="text-[10px] text-gray-600 dark:text-[#B3B3B3] uppercase font-bold mb-2 transition-colors duration-300">
              Mô hình dự báo
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-blue-500 dark:bg-[#1DB954] text-white dark:text-black text-xs font-bold py-2 rounded hover:brightness-110 transition-all duration-300">
                GFS
              </button>
              <button className="bg-gray-200 dark:bg-[#242424] text-gray-900 dark:text-white text-xs font-bold py-2 rounded hover:bg-gray-300 dark:hover:bg-[#3E3E3E] transition-all duration-300">
                ECMWF
              </button>
              <button className="bg-gray-200 dark:bg-[#242424] text-gray-900 dark:text-white text-xs font-bold py-2 rounded hover:bg-gray-300 dark:hover:bg-[#3E3E3E] transition-all duration-300">
                ICON
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* FOOTER: TIMELINE PLAYER */}
      <footer className="h-[90px] bg-gray-50 dark:bg-[#181818] border-t border-gray-200 dark:border-[#282828] px-4 flex items-center justify-between z-30 transition-colors duration-300">
        {/* LEFT: Legend */}
        <div className="w-[25%] flex flex-col gap-1">
          <p className="text-[10px] text-gray-600 dark:text-[#B3B3B3] uppercase font-bold transition-colors duration-300">
            Thang tốc độ
          </p>
          <div className="h-2 w-full max-w-[200px] rounded-full bg-gradient-to-r from-blue-500 dark:from-[#1DB954] via-yellow-500 to-red-600 relative transition-all duration-300">
            <div className="absolute top-1/2 left-[20%] -translate-y-1/2 size-3 bg-white border-2 border-gray-200 dark:border-[#121212] rounded-full shadow-md transition-colors duration-300"></div>
          </div>
          <div className="flex justify-between w-full max-w-[200px] text-[10px] text-gray-500 dark:text-[#727272] font-mono transition-colors duration-300">
            <span>0</span>
            <span>50</span>
            <span>100+ km/h</span>
          </div>
        </div>

        {/* CENTER: Timeline Control */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-gray-600 dark:text-[#B3B3B3] transition-colors duration-300">
              T5
            </span>
            <button className="size-8 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black hover:scale-105 transition-all duration-300">
              ▶
            </button>
            <span className="text-xs font-bold text-gray-600 dark:text-[#B3B3B3] transition-colors duration-300">
              T6
            </span>
          </div>
          <div className="flex items-center gap-2 w-full max-w-[500px]">
            <span className="text-xs font-mono text-gray-600 dark:text-[#B3B3B3] transition-colors duration-300">
              12:00
            </span>
            <div className="h-1 flex-1 bg-gray-300 dark:bg-[#404040] rounded-full relative group transition-colors duration-300">
              <div className="absolute inset-y-0 left-0 w-[40%] bg-blue-500 dark:bg-[#1DB954] rounded-full group-hover:brightness-110 transition-all duration-300"></div>
              <div className="absolute top-1/2 left-[40%] -translate-y-1/2 size-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow transition-opacity duration-300"></div>
            </div>
            <span className="text-xs font-mono text-gray-900 dark:text-white transition-colors duration-300">
              18:00
            </span>
          </div>
        </div>

        {/* RIGHT: Extra Options */}
        <div className="w-[25%] flex justify-end gap-2">
          <button className="p-2 text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            🔗
          </button>
          <button className="p-2 text-gray-600 dark:text-[#B3B3B3] hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            ⛶
          </button>
        </div>
      </footer>
    </div>
  );
}
