'use client';
import { useEffect } from 'react';
// eslint-disable-next-line react-hooks/exhaustive-deps
export function useEffectOnce(effect: () => void | (() => void)) { useEffect(effect, []); }