'use client';
import { useState, useEffect } from 'react';
interface BatteryState { charging: boolean; level: number; chargingTime: number; dischargingTime: number; supported: boolean; }
export function useBattery(): BatteryState {
  const [state, setState] = useState<BatteryState>({ charging: false, level: 1, chargingTime: 0, dischargingTime: Infinity, supported: false });
  useEffect(() => {
    const nav = navigator as any;
    if (!nav.getBattery) return;
    nav.getBattery().then((battery: any) => {
      const update = () => setState({ charging: battery.charging, level: battery.level, chargingTime: battery.chargingTime, dischargingTime: battery.dischargingTime, supported: true });
      update();
      battery.addEventListener('chargingchange', update);
      battery.addEventListener('levelchange', update);
    });
  }, []);
  return state;
}
