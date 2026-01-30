'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ZoomIn, Target } from 'lucide-react';

interface PinpointImageViewerProps {
    puzzleNumber: number;
    imageUrl: string;
    date: string;
    explanation?: string;
}

export default function PinpointImageViewer({ puzzleNumber, imageUrl, date, explanation }: PinpointImageViewerProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl p-8 mb-8 text-center text-white"
            >
                <h1 className="text-4xl md:text-5xl font-black mb-3">
                    Today's LinkedIn<br />Pinpoint #{puzzleNumber} Answer
                </h1>
                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                    <span className="font-mono">{date}</span>
                </div>
            </motion.div>

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

            <AnimatePresence>
                {isRevealed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                    >
                        <div className={`relative overflow-hidden rounded-2xl border-2 border-blue-500/30 shadow-2xl shadow-blue-900/30 bg-black ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                            {imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={imageUrl}
                                    alt={`Pinpoint #${puzzleNumber} Solution`}
                                    className={`w-full h-auto transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                                    onClick={() => setIsZoomed(!isZoomed)}
                                />
                            ) : (
                                <div className="p-12 text-center text-gray-500">
                                    <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>No screenshot uploaded for this day yet.</p>
                                </div>
                            )}
                        </div>
                        <p className="text-center text-sm text-gray-500">Tap image to zoom</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
