'use client';
import { useState, useEffect, useCallback } from 'react';
export function useCountdown(targetDate: Date) {
  const calcTimeLeft = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000), isExpired: false };
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());
  useEffect(() => { const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000); return () => clearInterval(timer); }, [calcTimeLeft]);
  return timeLeft;
}
