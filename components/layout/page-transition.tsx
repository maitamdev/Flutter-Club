'use client';
import { motion, AnimatePresence } from 'framer-motion';
interface PageTransitionProps { children: React.ReactNode; className?: string; }
export function PageTransition({ children, className }: PageTransitionProps) {
  return (<AnimatePresence mode='wait'><motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.2 }} className={className}>{children}</motion.div></AnimatePresence>);
}
