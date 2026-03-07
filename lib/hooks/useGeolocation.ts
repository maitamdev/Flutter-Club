'use client';
import { useState, useEffect } from 'react';
interface GeoState { latitude: number | null; longitude: number | null; accuracy: number | null; error: string | null; loading: boolean; }
export function useGeolocation(options?: PositionOptions): GeoState {
  const [state, setState] = useState<GeoState>({ latitude: null, longitude: null, accuracy: null, error: null, loading: true });
  useEffect(() => {
    if (!navigator.geolocation) { setState(s => ({ ...s, error: 'Geolocation not supported', loading: false })); return; }
    const id = navigator.geolocation.watchPosition(
      pos => setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy, error: null, loading: false }),
      err => setState(s => ({ ...s, error: err.message, loading: false })),
      options
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);
  return state;
}
