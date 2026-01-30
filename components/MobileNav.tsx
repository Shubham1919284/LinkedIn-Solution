'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Link2, Crown, Grid3X3 } from 'lucide-react';

export default function MobileNav() {
    const pathname = usePathname();

    const games = [
        { name: 'Pinpoint', href: '/game/pinpoint', icon: Target, activeColor: 'text-blue-500' },
        { name: 'Zip', href: '/game/zip', icon: Link2, activeColor: 'text-purple-500' },
        { name: 'Queens', href: '/game/queens', icon: Crown, activeColor: 'text-green-500' },
        { name: 'Sudoku', href: '/game/sudoku', icon: Grid3X3, activeColor: 'text-orange-500' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-lg border-t border-white/10 lg:hidden z-50 pb-safe">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto">
                {games.map((game) => {
                    const isActive = pathname === game.href;
                    const Icon = game.icon;

                    return (
                        <Link
                            key={game.name}
                            href={game.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? game.activeColor : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                            <span className="text-[10px] font-medium">{game.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
