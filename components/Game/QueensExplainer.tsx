'use client';

import { motion } from 'framer-motion';
import { Crown, Zap, BookOpen, Calendar } from 'lucide-react';

export default function QueensExplainer() {
    const features = [
        { icon: '♟️', title: 'Classic chess puzzle variant', desc: 'Place 8 Queens safely' },
        { icon: '🚫', title: 'No Queens can attack each other', desc: 'Strategic placement' },
        { icon: '📐', title: 'One Queen per row, column, region', desc: 'Logic constraints' },
        { icon: '📈', title: 'Daily difficulty progression', desc: 'Getting harder' },
        { icon: '🧩', title: 'Sharpen spatial reasoning', desc: 'Visual problem-solving' },
    ];

    const values = [
        { icon: Zap, title: 'Instant Solutions', desc: 'Get today\'s Queens answer instantly. See the complete board solution with Queen placements highlighted.' },
        { icon: BookOpen, title: 'Visual Board', desc: 'Interactive chess board showing the complete solution with animated Queen placements.' },
        { icon: Calendar, title: 'Daily Updates', desc: 'The Queens Today answer is updated after each new LinkedIn Queens puzzle is released.' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* What is Queens */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-6 text-4xl">
                    ♛
                </div>
                <h2 className="text-4xl font-black text-white mb-4">What is LinkedIn Queens?</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    LinkedIn Queens is a daily chess puzzle where you place 8 Queens on the board so that no Queen can attack another.
                    It's a strategic challenge that sharpens your spatial reasoning and problem-solving skills.
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
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-6 h-full hover:border-green-500/40 transition-all">
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">
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
                <h2 className="text-3xl font-black text-white">Why Use Our Queens Answer Guide?</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Everything you need to solve Queens puzzles</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <div key={idx} className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mx-auto">
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
