import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export const Toast = ({ toasts = [], removeToast }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#5E7A68]" />,
    error: <AlertCircle className="w-5 h-5 text-[#C86D51]" />,
    info: <Info className="w-5 h-5 text-[#C5A059]" />,
    reward: <Sparkles className="w-5 h-5 text-[#C5A059] animate-spin" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-[#FFFDF9] border border-[#C5A059]/40 rounded-2xl p-4 shadow-xl flex items-start gap-3 relative overflow-hidden"
          >
            <div className="flex-shrink-0 mt-0.5">
              {icons[toast.type] || icons.info}
            </div>
            <div className="flex-1 pr-2">
              {toast.title && (
                <h5 className="font-serif-title font-bold text-sm text-[#1C1917]">
                  {toast.title}
                </h5>
              )}
              <p className="text-xs text-[#57534E] leading-snug mt-0.5">
                {toast.message}
              </p>
            </div>
            {/* Progress bar effect */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]/20" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
