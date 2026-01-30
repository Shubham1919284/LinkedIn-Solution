'use client';

import { motion } from 'framer-motion';
import { Grid3X3, Zap, BookOpen, Calendar } from 'lucide-react';

export default function SudokuExplainer() {
    const features = [
        { icon: '🔢', title: 'Classic logic puzzle', desc: 'Fill the grid' },
        { icon: '🚫', title: 'No repeating numbers', desc: 'Row, column, box' },
        { icon: '🧠', title: 'Test logic & deduction', desc: 'Brain training' },
        { icon: '⚡', title: 'Quick mini version', desc: 'Perfect for breaks' },
        { icon: '📈', title: 'Daily new challenge', desc: 'Fresh grid everyday' },
    ];

    const values = [
        { icon: Zap, title: 'Instant Solution', desc: 'Get today\'s Mini Sudoku solution instantly. Check your grid against the solved puzzle.' },
        { icon: BookOpen, title: 'Visual Grid', desc: 'Clear screenshot of the completed grid to verify your numbers.' },
        { icon: Calendar, title: 'Daily Updates', desc: 'The Mini Sudoku Today answer is updated after each new LinkedIn puzzle is released.' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* What is Sudoku */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 mb-6 text-4xl">
                    <Grid3X3 className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4">What is LinkedIn Mini Sudoku?</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    LinkedIn Mini Sudoku is a bite-sized version of the classic logic puzzle.
                    Fill the grid so that every row, column, and region contains digits 1-6 (or 1-4) without repeating.
                </p>
            </motion.section>

            {/* 5 Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative group"
                    >
                        <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/20 rounded-2xl p-6 h-full hover:border-orange-500/40 transition-all">
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
                                {idx + 1}
                            </div>
                            <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-xs text-gray-500">{feature.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Why Use Our Guide */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center space-y-12"
            >
                <h2 className="text-3xl font-black text-white">Why Use Our Sudoku Answer Guide?</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Everything you need to verify your solution</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <div key={idx} className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mx-auto">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{value.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </motion.section>
        </div>
    );
}
