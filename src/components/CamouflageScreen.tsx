import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, ArrowLeft, Sun, CloudRain, CheckSquare, ShieldCheck, Clock } from 'lucide-react';

interface CamouflageScreenProps {
  onRestore: () => void;
}

export const CamouflageScreen: React.FC<CamouflageScreenProps> = ({ onRestore }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] p-4 sm:p-8 font-sans flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 6 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-sm border border-[#E8E2DC] p-5 sm:p-8"
      >
        {/* Header with authentic study camouflage */}
        <div className="flex items-center justify-between border-b border-[#E8E2DC] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F3EFEC] text-[#8B6D5C] rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight">Study Notes & Daily Planner</h1>
              <p className="text-xs sm:text-sm text-[#666]">General Studies Revision & Academic Project Tasks</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onRestore}
            className="text-xs sm:text-sm text-[#333] hover:text-[#000] flex items-center gap-1.5 border border-[#DED9D4] hover:border-[#8B6D5C] bg-[#FAF9F6] hover:bg-white rounded-full px-4 py-2 transition-all cursor-pointer font-bold shadow-2xs"
            title="Return to emergency portal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Resume</span>
          </motion.button>
        </div>

        {/* 3 Academic Widgets with smooth staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E8E2DC]"
          >
            <div className="flex items-center gap-2 text-[#8B6D5C] font-bold text-xs uppercase tracking-wider mb-2.5">
              <Sun className="w-4 h-4" />
              <span>Today's Schedule</span>
            </div>
            <ul className="text-xs sm:text-sm text-[#444] space-y-2.5">
              <li className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#8B6D5C] shrink-0" />
                <span>09:30 AM - Chapter 4 Revision</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#8B6D5C] shrink-0" />
                <span>11:00 AM - Economics Notes</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#AAA] shrink-0" />
                <span>03:30 PM - Library Assignment</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E8E2DC]"
          >
            <div className="flex items-center gap-2 text-[#8B6D5C] font-bold text-xs uppercase tracking-wider mb-2.5">
              <CloudRain className="w-4 h-4" />
              <span>Weather & Environment</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">28°C</p>
            <p className="text-xs sm:text-sm text-[#666] mt-1">Partly Cloudy • Humidity 62% • Air Quality: Moderate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E8E2DC]"
          >
            <div className="flex items-center gap-2 text-[#8B6D5C] font-bold text-xs uppercase tracking-wider mb-2.5">
              <Search className="w-4 h-4" />
              <span>Reference Topics</span>
            </div>
            <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
              Article 21: Right to Life and Personal Liberty. Judicial interpretations of fundamental privacy rights in the Indian Constitution.
            </p>
          </motion.div>
        </div>

        {/* Notes content */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-base font-semibold text-[#2D2D2D]">Weekly Assignment Summary</h2>
          <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
            Module 3: Overview of Indian administrative systems and public service frameworks. Focus on decentralized governance, community welfare programs, and statutory dispute resolution mechanisms.
          </p>

          <div className="flex items-center justify-between p-3.5 bg-[#FAF9F6] border border-[#F0EBE6] rounded-2xl text-xs text-[#777]">
            <div className="flex items-center gap-2 text-[#666]">
              <ShieldCheck className="w-4 h-4 text-[#8B6D5C]" />
              <span>Discreet Safe Screen Active</span>
            </div>
            <span className="font-mono text-[11px] text-[#888]">Press ESC or click Resume to return</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
