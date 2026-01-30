'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameCardProps {
    title: string;
    slug: string;
    description: string;
    color: string; // e.g., 'bg-blue-500'
}

export default function GameCard({ title, slug, description, color }: GameCardProps) {
    return (
        <Link href={`/${slug}`} className="block group">
            <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 p-6 h-full flex flex-col justify-between transition-colors hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
            >
                {/* Background Gradient Effect */}
                <div className={cn("absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 rounded-full pointer-events-none transition-opacity group-hover:opacity-40", color)} />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
                        <div className={cn("w-2 h-2 rounded-full animate-pulse", color)} />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                        {description}
                    </p>
                </div>

                <div className="relative z-10 flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    <span>View Answers</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
            </motion.div>
        </Link>
    );
}
