'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Target, Link2, Crown, Grid3X3 } from 'lucide-react';

export default function GameSidebar() {
    const pathname = usePathname();

    const games = [
        { name: 'Pinpoint', href: '/game/pinpoint', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50' },
        { name: 'Zip', href: '/game/zip', icon: Link2, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/50' },
        { name: 'Queens', href: '/game/queens', icon: Crown, color: 'text-green-500', bg: 'bg-green-500/10', border: 'hover:border-green-500/50' },
        { name: 'Sudoku', href: '/game/sudoku', icon: Grid3X3, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'hover:border-orange-500/50' },
    ];

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
        >
            {games.map((game) => {
                const isActive = pathname === game.href;
                const Icon = game.icon;

                return (
                    <Link href={game.href} key={game.name}>
                        <div className={`
              group relative flex items-center p-3 rounded-xl backdrop-blur-md border transition-all duration-300
              ${isActive ? 'bg-zinc-800 border-white/20 shadow-lg scale-110' : 'bg-black/40 border-white/5 hover:bg-zinc-900'}
              ${game.border}
            `}>
                            <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110
                ${game.bg} ${game.color}
              `}>
                                <Icon className="w-5 h-5" />
                            </div>

                            {/* Tooltip Label */}
                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-sm font-medium text-white opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap z-50">
                                {game.name}
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 border-2 border-white/10 rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </div>
                    </Link>
                );
            })}
        </motion.aside>
    );
}
