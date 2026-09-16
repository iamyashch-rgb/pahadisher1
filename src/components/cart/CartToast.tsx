'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartToast: React.FC = () => {
  const { toast, clearToast } = useCart();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-pahadi-green text-pahadi-offwhite px-4 py-3.5 rounded-2xl shadow-2xl border border-pahadi-gold/40 flex items-center justify-between space-x-3"
        >
          <div className="flex items-center space-x-3 min-w-0">
            {iconMap[toast.type]}
            <p className="text-xs font-sans font-medium text-pahadi-offwhite truncate">
              {toast.message}
            </p>
          </div>
          <button
            onClick={clearToast}
            className="p-1 hover:bg-white/10 rounded-full text-pahadi-sand transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
