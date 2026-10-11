import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, Sun, CloudRain, CheckSquare, Square, FileText } from 'lucide-react';

interface CamouflageScreenProps {
  onRestore: () => void;
}

interface ScheduleTask {
  id: string;
  time: string;
  title: string;
  completed: boolean;
}

export const CamouflageScreen: React.FC<CamouflageScreenProps> = ({ onRestore }) => {
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Dynamic live date computed entirely client-side with zero external network requests
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  useEffect(() => {
    // Keep date updated dynamically so it is never stale
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const formattedFullDate = currentDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedHeaderDate = currentDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // 2. Genuinely interactive Today's Schedule checkbox items (client-side only)
  const [tasks, setTasks] = useState<ScheduleTask[]>([
    { id: '1', time: '09:30 AM', title: 'Chapter 4 Revision', completed: true },
    { id: '2', time: '11:00 AM', title: 'Economics Notes', completed: true },
    { id: '3', time: '03:30 PM', title: 'Library Assignment', completed: false },
  ]);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Covert backup triple-tap on the top-left academic book icon for mobile restoration
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
            {/* Secret target on the static book icon (no visual tell) */}
            <div 
              onClick={handleSecretTap}
              className="w-10 h-10 bg-[#F3EFEC] text-[#8B6D5C] rounded-2xl flex items-center justify-center shrink-0 select-none"
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight">Study Notes & Daily Planner</h1>
              <p className="text-xs sm:text-sm text-[#666]">
                <span className="sm:hidden font-medium text-[#444]">{formattedHeaderDate} • </span>
                General Studies Revision & Academic Project Tasks
              </p>
            </div>
          </div>
          
          {/* Authentic academic semester status badge with live client-side date */}
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#888] font-medium bg-[#FAF9F6] border border-[#E8E2DC] px-3.5 py-1.5 rounded-full">
            <span>{formattedFullDate}</span>
            <span className="text-[#CCC]">•</span>
            <span>Semester 2</span>
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
            <div className="flex items-center justify-between text-[#8B6D5C] font-bold text-xs uppercase tracking-wider mb-2.5">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <span>Today's Schedule</span>
              </div>
              <span className="text-[10px] font-medium text-[#888] normal-case tracking-normal">
                {formattedHeaderDate}
              </span>
            </div>
            {/* Interactive checkboxes for Schedule Tasks */}
            <ul className="text-xs sm:text-sm text-[#444] space-y-2.5" role="list">
              {tasks.map((task) => (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    className="w-full flex items-center gap-2 text-left cursor-pointer p-1 -m-1 rounded-lg hover:bg-black/5 transition-colors group select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B6D5C]"
                    aria-label={`Toggle ${task.title}`}
                  >
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-[#8B6D5C] shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-[#AAA] group-hover:text-[#8B6D5C] shrink-0" />
                    )}
                    <span className={task.completed ? 'line-through text-[#888] transition-all' : 'text-[#333] transition-all'}>
                      {task.time} - {task.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Static, plausible weather value - NO external API call to preserve 100% on-device privacy */}
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
