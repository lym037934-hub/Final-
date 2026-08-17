import { MotherboardCard, Card } from "../components/CardSection";

const ContectSection = () => {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white py-12 md:py-20 relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 md:space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 dark:bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full font-orbitron tracking-widest uppercase shadow-md dark:shadow-lg shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
            Hardware Ecosystem
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-orbitron tracking-tight text-gray-900 dark:text-white uppercase">
            PC COMPONENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">CATEGORY</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 font-rajdhani text-base sm:text-lg font-medium tracking-wide max-w-2xl mx-auto">
            Build your ultimate custom rig with ultra-performance components engineered for elite gaming & multi-threaded rendering.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
          {/* Motherboard Banner - Full Width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 min-h-[300px]">
            <MotherboardCard />
          </div>

          {/* Processor Card */}
          <div className="col-span-1 lg:col-span-1 min-h-[380px]">
            <Card
              title="PROCESSOR"
              subtitle="- VIEW MORE -"
              image="/cpu.png"
              badge="FLAGSHIP CPU"
            />
          </div>

          {/* Graphics Card - Big Featured Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[380px]">
            <Card
              title="GRAPHICS CARD"
              subtitle="- VIEW MORE -"
              image="/gpu.png"
              big
              badge="EXTREME PERFORMANCE"
            />
          </div>

          {/* Memory RAM */}
          <div className="col-span-1 lg:col-span-1 min-h-[360px]">
            <Card
              title="MEMORY"
              subtitle="- VIEW MORE -"
              image="/ram.png"
              badge="DDR5 HIGH SPEED"
            />
          </div>

          {/* Power Supply PSU */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 min-h-[360px]">
            <Card
              title="POWER SUPPLY"
              subtitle="- VIEW MORE -"
              image="/psu.png"
              badge="80 PLUS GOLD"
            />
          </div>

          {/* PC Casing */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 min-h-[360px]">
            <Card
              title="PC CASING"
              subtitle="- VIEW MORE -"
              image="/case.png"
              badge="RGB AIRFLOW"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContectSection;


export const ContactSection = ContectSection;
export const ContentSection = ContectSection;
export const ComponentSection = ContectSection;