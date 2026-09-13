import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, Sun, CloudRain, CheckSquare, Clock, FileText } from 'lucide-react';

interface CamouflageScreenProps {
  onRestore: () => void;
}

export const CamouflageScreen: React.FC<CamouflageScreenProps> = ({ onRestore }) => {
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Covert triple-tap on the top-left academic book icon for mobile restoration
  const handleSecretTap = () => {
    tapCountRef.current += 1;
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;
      onRestore();
      return;
    }

    tapTimeoutRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] p-4 sm:p-8 font-sans flex flex-col justify-center select-none"
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
            {/* Secret triple-tap target on the static book icon (no cursor or visual tell) */}
            <div 
              onClick={handleSecretTap}
              className="w-10 h-10 bg-[#F3EFEC] text-[#8B6D5C] rounded-2xl flex items-center justify-center shrink-0 select-none"
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight">Study Notes & Daily Planner</h1>
              <p className="text-xs sm:text-sm text-[#666]">General Studies Revision & Academic Project Tasks</p>
            </div>
          </div>
          
          {/* Authentic academic semester status badge replacing the previous Resume button */}
          <span className="hidden sm:inline-block text-xs text-[#888] font-medium bg-[#FAF9F6] border border-[#E8E2DC] px-3.5 py-1.5 rounded-full">
            Semester 2 • Syllabus Tracker
          </span>
        </div>

        {/* 3 Academic Widgets with smooth staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
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

        {/* Weekly Assignment Summary: Styled consistently with cards above */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E8E2DC] space-y-2.5"
        >
          <div className="flex items-center gap-2 text-[#8B6D5C] font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Weekly Assignment Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            Module 3: Overview of Indian administrative systems and public service frameworks. Focus on decentralized governance, community welfare programs, and statutory dispute resolution mechanisms.
          </p>
          <div className="pt-2 border-t border-[#E8E2DC]/80 flex flex-wrap items-center justify-between text-xs text-[#777] gap-2">
            <span>Deadline: Friday, 5:00 PM</span>
            <span className="text-[#8B6D5C] font-semibold">Status: In Progress (3/5 Units)</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
