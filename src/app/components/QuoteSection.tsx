import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const QuoteSection = () => {
  const [activeTab, setActiveTab] = useState<'quote' | 'joke'>('quote');

  // Auto-rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => prev === 'quote' ? 'joke' : 'quote');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#F8F9FA] py-[10px] overflow-hidden">
      <div className="max-w-md mx-auto overflow-hidden m-[0px] px-[3px] py-[5px]">
        {/* Section Title - Moved outside card */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px bg-[#243D68]/20 flex-1"></div>
          <h3 className="font-black text-xl tracking-widest text-[#243D68] font-sans uppercase">
            Today's Quote
          </h3>
          <div className="h-px bg-[#243D68]/20 flex-1"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-[32px] shadow-xl overflow-hidden relative max-w-4xl mx-auto p-[0px]"
        >
          {/* Pause Button - Floating - Gold Accent */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-12 z-20 w-12 h-12 bg-[#FAC06E] rounded-full flex items-center justify-center shadow-lg text-[#243D68] ring-4 ring-white"
          >
            <span className="material-symbols-outlined text-3xl font-bold">pause</span>
          </motion.button>

          {/* Main Content Area - Primary Blue Border */}
          <div className="relative overflow-hidden border-3 border-[#243D68] rounded-[32px] mx-4 mt-4 px-[20px] pt-[20px] pb-[0px]">
            {/* Background Watermark */}
            <div className="absolute top-4 left-4 text-[180px] leading-none text-gray-50 font-serif select-none pointer-events-none z-0">
              “
            </div>
            
            <div className="relative z-10 pt-4">
              
              {/* Quote Text */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === 'quote' ? (
                  <h2 className="font-['Lora'] font-bold text-[#333333] leading-relaxed mb-6 tracking-tight text-[16px]">
                    "Setiap langkah kecil yang kita ambil hari ini adalah <span className="bg-[#FAC06E]/20 text-[#243D68] px-1 rounded">fondasi</span> untuk pembebasan Baitul Maqdis esok hari."
                  </h2>
                ) : (
                  <h2 className="font-['Lora'] font-bold text-[#333333] leading-relaxed mb-6 tracking-tight text-[16px]">
                    "Saya <span className="bg-[#FAC06E]/20 text-[#243D68] px-1 rounded">optimis</span> dan haqqul yaqin bahwa Indonesia akan menjadi pemimpin persiapan <span className="bg-[#FAC06E]/20 text-[#243D68] px-1 rounded">ilmu</span> dalam pembebasan Baitul Maqdis"
                  </h2>
                )}
              </motion.div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#243D68]/10 relative flex-shrink-0">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE3MTMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                    alt="Author" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <span className="text-sm font-semibold text-[#666666] leading-tight">
                  {activeTab === 'quote' ? 'Muhammad Alfatih' : 'Prof Dr Abdul Fattah El Awaisi Al Maqdisi'}
                </span>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="p-4 flex gap-2 justify-center items-center mt-2">
            <button
              onClick={() => setActiveTab('quote')}
              className="group p-1"
              aria-label="Quote 1"
            >
              <div className={`transition-all duration-300 rounded-full ${
                activeTab === 'quote' 
                  ? 'w-8 h-2 bg-[#FAC06E]' 
                  : 'w-2 h-2 bg-[#243D68]/30 hover:bg-[#243D68]/50'
              }`} />
            </button>
            
            <button
              onClick={() => setActiveTab('joke')}
              className="group p-1"
              aria-label="Quote 2"
            >
              <div className={`transition-all duration-300 rounded-full ${
                activeTab === 'joke' 
                  ? 'w-8 h-2 bg-[#FAC06E]' 
                  : 'w-2 h-2 bg-[#243D68]/30 hover:bg-[#243D68]/50'
              }`} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};