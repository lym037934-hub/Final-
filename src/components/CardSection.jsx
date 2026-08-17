// CardSection.jsx

// Function 1: Motherboard banner (text left, image right)
export function MotherboardCard({ onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-white via-indigo-50/50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/90 border border-gray-200 dark:border-slate-800/80 hover:border-cyan-500/50 rounded-3xl overflow-hidden h-full p-6 md:p-8 transition-all duration-300 shadow-xl dark:shadow-none hover:shadow-2xl hover:shadow-cyan-500/15 cursor-pointer backdrop-blur-xl"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500 pointer-events-none" />

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-3 z-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs px-2.5 py-1 rounded-full font-bold font-orbitron tracking-wider">
            AMD RYZEN
          </span>
          <span className="bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold font-orbitron tracking-wider">
            INTEL CORE
          </span>
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md font-rajdhani">
            NEXT-GEN CHIPSETS
          </span>
        </div>

        <h2 className="text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-orbitron tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-cyan-600 dark:group-hover:from-white dark:group-hover:via-cyan-200 dark:group-hover:to-cyan-400 transition-all duration-300">
          MOTHERBOARD
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-rajdhani font-medium max-w-md">
          Unleash maximum overclocking stability with PCIe 5.0, DDR5 support, and ultra-durable power phases.
        </p>

        <div className="mt-2 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold font-orbitron text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-300">
          <span>VIEW COLLECTION</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>

      {/* Image Side */}
      <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full flex items-center justify-center relative mt-4 md:mt-0 z-10 overflow-hidden">
        <img
          src="/motherboard.png"
          alt="Motherboard"
          className="w-full h-full object-contain max-h-60 md:max-h-72 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 ease-out drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
        />
      </div>
    </div>
  );
}

// Function 2: Reusable card (Processor, Graphics, Memory, PSU, Casing)
export function Card({
  title,
  subtitle,
  image,
  dark = true,
  big = false,
  badge = null,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-3xl overflow-hidden h-full p-6 text-center bg-white dark:bg-slate-950/90 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 shadow-lg dark:shadow-none hover:shadow-2xl hover:shadow-cyan-500/15 cursor-pointer backdrop-blur-xl"
    >
      {/* Subtle glowing ambient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card Header Info */}
      <div className="z-10 flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          {badge && (
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-orbitron uppercase tracking-wider">
              {badge}
            </span>
          )}
          {big && (
            <span className="bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-orbitron uppercase tracking-wider">
              DISCOVER THE EXTRAORDINARY
            </span>
          )}
        </div>

        <h2
          className={`font-bold font-orbitron tracking-wide text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300 ${
            big ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
          }`}
        >
          {title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-rajdhani mt-1 uppercase tracking-wider font-semibold">
          {subtitle || "- VIEW MORE -"}
        </p>
      </div>

      {/* Image Showcase */}
      <div className="my-4 flex-1 flex items-center justify-center relative min-h-[160px] sm:min-h-[200px] z-10">
        <img
          src={image}
          alt={title}
          className={`w-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] ${
            big ? "max-h-64 sm:max-h-72" : "max-h-44 sm:max-h-48"
          }`}
        />
      </div>

      {/* Card Footer CTA */}
      <div className="z-10 pt-3 border-t border-gray-200 dark:border-slate-800/60 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-rajdhani font-semibold">
        <span className="group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">EXPLORE PRODUCTS</span>
        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-800 group-hover:bg-cyan-500 group-hover:text-white dark:group-hover:text-black text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}