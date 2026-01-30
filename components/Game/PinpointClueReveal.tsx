'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

interface PinpointClueRevealProps {
    puzzleNumber: number;
    clues: string[];
    answer: string;
    explanation?: string;
    date: string;
}

export default function PinpointClueReveal({ puzzleNumber, clues, answer, explanation, date }: PinpointClueRevealProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(answer);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl p-8 mb-8 text-center text-white"
            >
                <h1 className="text-4xl md:text-5xl font-black mb-3">
                    Today's LinkedIn<br />Pinpoint #{puzzleNumber} Answer<br />& Solution
                </h1>
                {explanation && (
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
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
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 mx-auto shadow-xl shadow-blue-900/30"
                >
                    {isRevealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    {isRevealed ? 'Hide the answer' : 'Reveal Today\'s Answer'}
                </motion.button>
            </div>

            {/* Clues & Answer */}
            <AnimatePresence>
                {isRevealed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                    >
                        {/* Instruction */}
                        <p className="text-center text-gray-400 text-sm">
                            💡 Hover (desktop) or tap (mobile) each clue to see how it connects to the answer theme.
                        </p>

                        {/* Pinpoint Clues */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white mb-4">Pinpoint #{puzzleNumber} Clues:</h3>
                            {clues.map((clue, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="flex items-center gap-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-4 hover:border-blue-500/40 hover:scale-[1.02] transition-all cursor-pointer">
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-lg">
                                            #{idx + 1}
                                        </div>
                                        <div className="text-lg font-medium text-white">{clue}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Answer */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: clues.length * 0.1 }}
                            className="bg-black border border-blue-500/30 rounded-2xl p-8 text-center mt-8"
                        >
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Pinpoint #{puzzleNumber} Answer:</p>
                            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6">
                                {answer}
                            </h2>
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
