'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Crown } from 'lucide-react';

interface QueensGridViewerProps {
    puzzleNumber: number;
    solution: number[]; // Array of 8 numbers representing Queen positions (0-7 for each row)
    date: string;
    explanation?: string;
}

export default function QueensGridViewer({ puzzleNumber, solution, date, explanation }: QueensGridViewerProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 rounded-2xl p-8 mb-8 text-center text-white"
            >
                <h1 className="text-4xl md:text-5xl font-black mb-3">
                    Today's LinkedIn<br />Queens #{puzzleNumber} Answer<br />& Solution
                </h1>
                {explanation && (
                    <p className="text-green-100 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                        {explanation}
                    </p>
                )}
                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                    <span className="font-mono">{date}</span>
                </div>
            </motion.div>

            {/* Reveal Button */}
            <div className="text-center mb-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsRevealed(!isRevealed)}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 mx-auto shadow-xl shadow-green-900/30"
                >
                    {isRevealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    {isRevealed ? 'Hide Solution' : 'Show Solution'}
                </motion.button>
            </div>

            {/* Chess Board */}
            <AnimatePresence>
                {isRevealed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                    >
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-zinc-900 border border-green-500/30 rounded-2xl p-6">
                                <div className="grid grid-cols-8 gap-1 aspect-square">
                                    {Array.from({ length: 64 }).map((_, idx) => {
                                        const row = Math.floor(idx / 8);
                                        const col = idx % 8;
                                        const isLight = (row + col) % 2 === 0;
                                        const hasQueen = solution[row] === col;

                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: idx * 0.01 }}
                                                className={`
                          flex items-center justify-center rounded-sm
                          ${isLight ? 'bg-green-200/20' : 'bg-green-900/20'}
                          ${hasQueen ? 'bg-green-500 ring-2 ring-green-400' : ''}
                        `}
                                            >
                                                {hasQueen && (
                                                    <motion.div
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{ delay: row * 0.15, type: 'spring' }}
                                                        className="text-2xl md:text-4xl"
                                                    >
                                                        ♛
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="bg-black border border-green-500/30 rounded-2xl p-8 text-center max-w-2xl mx-auto">
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Queens #{puzzleNumber} Complete Board</p>
                            <div className="flex items-center justify-center gap-2 text-lg">
                                <Crown className="w-5 h-5 text-green-400" />
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-bold">
                                    8 Queens Placed Successfully
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
