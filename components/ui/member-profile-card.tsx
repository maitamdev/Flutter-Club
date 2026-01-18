'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Award, Zap, Target, Star, ShieldCheck, Camera } from 'lucide-react'

interface SkillStats {
    flutter: number
    dart: number
    firebase: number
    uiux: number
    logic: number
}

interface MemberProfileCardProps {
    name: string
    role: string
    level: number
    avatarUrl?: string
    skills?: SkillStats
    onAvatarClick?: () => void
}

export const MemberProfileCard: React.FC<MemberProfileCardProps> = ({
    name = "Thành viên",
    role = "Flutter Developer",
    level = 15,
    avatarUrl,
    skills = { flutter: 85, dart: 80, firebase: 65, uiux: 90, logic: 75 },
    onAvatarClick
}) => {
    const cardRef = useRef<HTMLDivElement>(null)

    // Motion values for tilt effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Smooth springs for tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 })

    // Holographic shimmer position
    const shimmerX = useTransform(x, [-0.5, 0.5], ["0%", "100%"])
    const shimmerY = useTransform(y, [-0.5, 0.5], ["0%", "100%"])

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const relativeX = (mouseX / rect.width) - 0.5
        const relativeY = (mouseY / rect.height) - 0.5
        x.set(relativeX)
        y.set(relativeY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className="relative w-full max-w-[340px] aspect-[2/3] group cursor-pointer"
        >
            {/* Outer Card Shell */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-white/20 bg-gray-950 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_80px_rgba(59,130,246,0.3)]">

                {/* Holographic Shimmer Overlay */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-40"
                    style={{
                        background: `radial-gradient(circle at ${shimmerX} ${shimmerY}, rgba(255,255,255,0.8) 0%, transparent 60%), linear-gradient(135deg, transparent 0%, rgba(59,130,246,0.2) 20%, rgba(147,51,234,0.2) 40%, transparent 60%)`,
                        mixBlendMode: "overlay"
                    }}
                />

                {/* Card Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />

                {/* Content Container */}
                <div className="relative z-10 w-full h-full p-6 flex flex-col items-center">

                    {/* Header Section */}
                    <div className="w-full flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                                <ShieldCheck className="h-5 w-5 text-blue-400" />
                            </div>
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">PRO MEMBER</span>
                        </div>
                        <div className="text-xl font-black text-white/50 italic italic italic italic">#{level}</div>
                    </div>

                    {/* Avatar Area */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500 blur-[30px] opacity-20 animate-pulse" />
                        <div
                            className="relative h-32 w-32 rounded-3xl border-2 border-white/30 overflow-hidden bg-gray-900 shadow-2xl group/avatar cursor-pointer"
                            onClick={onAvatarClick}
                        >
                            <img
                                src={avatarUrl || `/images/welcome-bot.png`}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                            {/* Edit Overlay */}
                            {onAvatarClick && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <Camera className="h-6 w-6 text-white" />
                                        <span className="text-xs text-white font-semibold">Chỉnh sửa</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Rank Badge */}
                        <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                            <Award className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-black text-white mb-1 tracking-tight group-hover:scale-110 transition-transform duration-300">
                            {name.toUpperCase()}
                        </h3>
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] font-bold text-blue-400 uppercase">
                            {role}
                        </div>
                    </div>

                    {/* Stats / Radar Chart Mockup */}
                    <div className="w-full space-y-4">
                        {/* Progress Bars for Skills */}
                        <div className="space-y-3">
                            <SkillBar label="Flutter" value={skills.flutter} color="bg-cyan-400" />
                            <SkillBar label="UI/UX" value={skills.uiux} color="bg-pink-500" />
                            <SkillBar label="Dart" value={skills.dart} color="bg-blue-500" />
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-auto w-full pt-6 border-t border-white/10 flex justify-between items-center">
                        <div className="flex gap-3">
                            <Zap className="h-4 w-4 text-yellow-400 opacity-50" />
                            <Target className="h-4 w-4 text-red-500 opacity-50" />
                            <Star className="h-4 w-4 text-purple-500 opacity-50" />
                        </div>
                        <div className="text-[10px] font-medium text-gray-500 uppercase">FT-CLUB-HUB // DIV-01</div>
                    </div>
                </div>

                {/* Decorative Corner Lights */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/20 blur-[40px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/20 blur-[40px] rounded-full translate-x-1/2 translate-y-1/2" />
            </div>
        </motion.div>
    )
}

const SkillBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="space-y-1">
        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
            />
        </div>
    </div>
)
