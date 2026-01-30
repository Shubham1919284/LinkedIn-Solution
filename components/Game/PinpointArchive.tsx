'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

interface HistoricalPuzzle {
    puzzleNumber: number;
    date: string;
    clues: string[];
    answer: string;
}

export default function PinpointArchive() {
    const [puzzles, setPuzzles] = useState<HistoricalPuzzle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPuzzles = async () => {
            try {
                const q = query(
                    collection(db, 'solutions'),
                    where('game', '==', 'pinpoint'),
                    orderBy('timestamp', 'desc'),
                    limit(12)
                );

                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => doc.data() as HistoricalPuzzle);
                setPuzzles(data);
            } catch (error) {
                console.error('Error fetching archive:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPuzzles();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-white mb-4">
                    Recent LinkedIn Pinpoint<br />Answers and Detailed Solutions
                </h2>
                <p className="text-gray-400">
                    Click any Pinpoint to view detailed step-by-step solutions and improve your cognitive agility, pattern recognition, and problem-solving skills.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {puzzles.map((puzzle, idx) => (
                    <motion.div
                        key={puzzle.puzzleNumber}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Link href={`/game/pinpoint?puzzle=${puzzle.puzzleNumber}`}>
                            <div className="group bg-zinc-900 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        #{puzzle.puzzleNumber}
                                    </div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                        {puzzle.puzzleNumber === 639 ? 'Latest' : puzzle.date}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                                    LinkedIn Pinpoint #{puzzle.puzzleNumber} : {puzzle.clues.slice(0, 3).join(', ')}...
                                </h3>

                                <div className="text-sm text-gray-400 mb-4">
                                    {puzzle.date}
                                </div>

                                <div className="flex items-center text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                                    <span>View Answer</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
