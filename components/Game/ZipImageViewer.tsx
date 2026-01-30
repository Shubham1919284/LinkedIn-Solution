'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ZoomIn, Link2 } from 'lucide-react';
import Image from 'next/image';

interface ZipImageViewerProps {
    puzzleNumber: number;
    imageUrl: string;
    date: string;
    explanation?: string;
}

export default function ZipImageViewer({ puzzleNumber, imageUrl, date, explanation }: ZipImageViewerProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 rounded-2xl p-8 mb-8 text-center text-white"
            >
                <h1 className="text-4xl md:text-5xl font-black mb-3">
                    Today's LinkedIn<br />Zip #{puzzleNumber} Answer<br />& Solution
                </h1>
                {explanation && (
                    <p className="text-purple-100 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 mx-auto shadow-xl shadow-purple-900/30"
                >
                    {isRevealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    {isRevealed ? 'Hide the answer' : 'Reveal Today\'s Answer'}
                </motion.button>
            </div>

            {/* Image Viewer */}
            <AnimatePresence>
                {isRevealed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                    >
                        <div className="relative group">
                            {/* Enhanced Badge */}
                            <div className="absolute top-4 right-4 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Enhanced
                            </div>

                            {/* Zoom Button */}
                            <button
                                onClick={() => setIsZoomed(!isZoomed)}
                                className="absolute top-4 left-4 z-10 bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full shadow-lg transition-colors"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>

                            {/* Image Container */}
                            <div className={`relative overflow-hidden rounded-2xl border-2 border-purple-500/30 shadow-2xl shadow-purple-900/30 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 pointer-events-none" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageUrl}
                                    alt={`Zip #${puzzleNumber} Solution`}
                                    className={`w-full h-auto transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                                    onClick={() => setIsZoomed(!isZoomed)}
                                />
                            </div>
                        </div>

                        <div className="bg-black border border-purple-500/30 rounded-2xl p-8 text-center">
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Zip #{puzzleNumber} Visual Solution</p>
                            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold mb-4">
                                Bridge word shown in enhanced screenshot above
                            </p>
                            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-full transition-colors">
                                <Link2 className="w-4 h-4" />
                                Copy Image Link
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
