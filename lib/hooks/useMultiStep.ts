'use client'
import { useState, useCallback } from 'react'

interface Step { currentStep: number; totalSteps: number }
export function useMultiStep(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0)
  const next = useCallback(() => setCurrentStep(s => Math.min(s + 1, totalSteps - 1)), [totalSteps])
  const prev = useCallback(() => setCurrentStep(s => Math.max(s - 1, 0)), [])
  const goTo = useCallback((step: number) => setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1))), [totalSteps])
  const reset = useCallback(() => setCurrentStep(0), [])
  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1
  return { currentStep, totalSteps, next, prev, goTo, reset, isFirst, isLast }
}
