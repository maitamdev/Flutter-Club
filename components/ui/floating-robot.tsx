'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageCircle, X } from 'lucide-react'

export const FloatingRobot = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isWaving, setIsWaving] = useState(false)
    const controls = useAnimation()

    // Generate a random position within screen bounds
    const getRandomPosition = () => {
        if (typeof window === 'undefined') return { x: 0, y: 0 }

        const margin = 100
        const x = Math.random() * (window.innerWidth - margin * 2) + margin
        const y = Math.random() * (window.innerHeight - margin * 2) + margin

        return { x, y }
    }

    const moveRandomly = async () => {
        const nextPos = getRandomPosition()

        await controls.start({
            left: nextPos.x,
            top: nextPos.y,
            transition: {
                duration: Math.random() * 5 + 5,
                ease: "easeInOut"
            }
        })

        // Tiny wait before next move
        setTimeout(moveRandomly, Math.random() * 2000 + 1000)
    }

    useEffect(() => {
        moveRandomly()

        // Initial wave after 2 seconds
        const waveTimer = setTimeout(() => setIsWaving(true), 2000)
        const waveStopTimer = setTimeout(() => setIsWaving(false), 4000)

        return () => {
            clearTimeout(waveTimer)
            clearTimeout(waveStopTimer)
        }
    }, [])

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                animate={controls}
                initial={{ left: '80%', top: '80%', opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="fixed z-[9999] pointer-events-auto cursor-grab active:cursor-grabbing group"
                style={{ width: 120, height: 120 }}
                drag
                dragConstraints={{ left: 0, right: window?.innerWidth - 120, top: 0, bottom: window?.innerHeight - 120 }}
            >
                {/* Robot Body */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative w-full h-full"
                >
                    {/* Subtle Glow Background */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-75 animate-pulse" />

                    {/* The Mascot Image - Using mix-blend-mode to deal with the background */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-lg bg-black/40 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <img
                            src="/images/robot-mascot.png"
                            alt="AI Mascot"
                            className="w-full h-full object-cover scale-110"
                            style={{ mixBlendMode: 'lighten' }}
                        />
                    </div>

                    {/* Speech Bubble (Optional/Contextual) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        whileHover={{ opacity: 1, scale: 1, y: -40 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1.5 rounded-2xl text-xs font-bold shadow-xl border border-blue-500/30 whitespace-nowrap z-50 pointer-events-none"
                    >
                        Chào chủ nhân! ✨
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45 border-b border-r border-blue-500/30" />
                    </motion.div>

                    {/* Close Button on Hover */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:bg-red-600 z-[100]"
                    >
                        <X size={12} />
                    </button>
                </motion.div>

                {/* Trail Effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500/30 blur-md rounded-full scale-x-150 animate-pulse" />
            </motion.div>
        </AnimatePresence>
    )
}
