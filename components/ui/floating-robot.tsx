'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageCircle, X } from 'lucide-react'

export const FloatingRobot = () => {
    const [mounted, setMounted] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const controls = useAnimation()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && isVisible) {
            startRandomMovement()
        }
    }, [mounted, isVisible])

    const startRandomMovement = async () => {
        if (typeof window === 'undefined' || !isVisible) return

        const move = async () => {
            if (isDragging || isHovered || !isVisible) return

            // Calculate random target within screen bounds
            const maxX = window.innerWidth - 150
            const maxY = window.innerHeight - 150
            const nextX = Math.random() * maxX
            const nextY = Math.random() * maxY

            await controls.start({
                left: nextX,
                top: nextY,
                transition: {
                    duration: Math.random() * 5 + 10,
                    ease: "easeInOut"
                }
            })

            if (!isDragging && !isHovered && isVisible) {
                setTimeout(move, Math.random() * 3000 + 1000)
            }
        }

        move()
    }

    if (!mounted || !isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                animate={controls}
                initial={{ opacity: 0, scale: 0, left: '80%', top: '80%' }}
                exit={{ opacity: 0, scale: 0 }}
                className="fixed z-[9999] pointer-events-none"
                style={{ width: 120, height: 120 }}
            >
                <motion.div
                    drag
                    dragMomentum={false}
                    onDragStart={() => {
                        setIsDragging(true)
                        controls.stop()
                    }}
                    onDragEnd={() => {
                        setIsDragging(false)
                        setTimeout(startRandomMovement, 1000)
                    }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => {
                        setIsHovered(false)
                        setTimeout(startRandomMovement, 1000)
                    }}
                    className="pointer-events-auto cursor-grab active:cursor-grabbing group relative w-full h-full"
                >
                    {/* Robot Body */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                            rotate: isDragging ? 0 : [0, 5, -5, 0],
                            scale: isHovered ? 1.1 : 1
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

                        {/* The Mascot Image */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-lg bg-black/40 backdrop-blur-sm group-hover:border-blue-400/50 transition-all duration-300">
                            <motion.img
                                src="/images/robot-mascot.png"
                                alt="AI Mascot"
                                animate={isHovered ? {
                                    rotate: [0, 15, -15, 15, 0],
                                } : {}}
                                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                                className="w-full h-full object-cover scale-110 select-none pointer-events-none"
                                style={{ mixBlendMode: 'lighten' }}
                                draggable={false}
                            />
                        </div>

                        {/* Speech Bubble */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={(isHovered || isDragging) ? { opacity: 1, scale: 1, y: -50 } : { opacity: 0, scale: 0, y: 0 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl border border-blue-500/30 whitespace-nowrap z-50 pointer-events-none transition-all"
                        >
                            Chào bạn! ✨
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45 border-b border-r border-blue-500/30" />
                        </motion.div>

                        {/* Close Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsVisible(false)
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg hover:bg-red-600 z-[100]"
                        >
                            <X size={12} />
                        </button>
                    </motion.div>

                    {/* Trail Effect */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500/30 blur-md rounded-full scale-x-150 animate-pulse" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
