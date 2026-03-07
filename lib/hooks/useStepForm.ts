'use client';
import { useState, useCallback } from 'react';
export function useStepForm<T extends Record<string, unknown>>(steps: string[], initialData: T) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(initialData);
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const next = useCallback(() => { if (!isLast) setCurrentStep(s => s + 1); }, [isLast]);
  const prev = useCallback(() => { if (!isFirst) setCurrentStep(s => s - 1); }, [isFirst]);
  const goTo = useCallback((step: number) => setCurrentStep(Math.min(Math.max(0, step), steps.length - 1)), [steps.length]);
  const updateData = useCallback((partial: Partial<T>) => setData(d => ({ ...d, ...partial })), []);
  return { currentStep, stepName: steps[currentStep], data, isFirst, isLast, next, prev, goTo, updateData, totalSteps: steps.length };
}
