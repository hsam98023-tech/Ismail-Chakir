import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Calendar, Gift } from 'lucide-react';
import { calculateTimeLeft, TimeLeft } from './utils/time';
import CountdownItem from './components/CountdownItem';

const App: React.FC = () => {
  // Target Date: February 18th (Month is 1 because 0-indexed)
  const TARGET_MONTH = 1; 
  const TARGET_DAY = 18;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(TARGET_MONTH, TARGET_DAY));
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(TARGET_MONTH, TARGET_DAY));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerCelebration = useCallback(() => {
    // Fire confetti from multiple angles for a premium feel
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d946ef', '#8b5cf6', '#f472b6', '#fbbf24']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d946ef', '#8b5cf6', '#f472b6', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card max-w-2xl w-full rounded-[2rem] p-8 sm:p-12 relative text-center border-white/50"
      >
        {/* Decorative Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg border border-purple-100"
        >
          <Gift className="w-10 h-10 text-purple-500" />
        </motion.div>

        {/* Header */}
        <div className="mt-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-2 text-purple-600 font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span className="tracking-widest uppercase text-sm">Upcoming Special Day</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-gray-800 mb-2 leading-tight">
             عيد ميلاد سعيد
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              مروى
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 mt-4 text-sm sm:text-base bg-white/40 inline-flex px-4 py-1.5 rounded-full">
             18 فبراير 2008 <Calendar className="w-4 h-4" />
          </div>
        </div>

        {/* Message */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto font-light"
        >
          أتمنى لكِ عاماً مليئاً بالسعادة والنجاح وتحقيق كل الأحلام. كل عام وأنتِ مصدر للبهجة والجمال يا مروى!
        </motion.p>

        {/* Countdown */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center items-center" dir="ltr">
            <CountdownItem value={timeLeft.days} label="Days" />
            <CountdownItem value={timeLeft.hours} label="Hours" />
            <CountdownItem value={timeLeft.minutes} label="Minutes" />
            <CountdownItem value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          onClick={triggerCelebration}
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-3 mx-auto"
        >
          <span className="relative z-10">احتفل مع مروى</span>
          <Heart className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isHovering ? 'scale-125 fill-white' : ''}`} />
          
          {/* Shine effect on button */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        </motion.button>

        {/* Footer */}
        <div className="mt-12 text-sm text-gray-400 font-light">
          صنع بكل حب ❤️
        </div>
      </motion.div>
    </div>
  );
};

export default App;