'use client';

import { motion } from 'framer-motion';
import { Link2, Sparkles, BookOpen, Calendar } from 'lucide-react';

export default function ZipExplainer() {
    const features = [
        { icon: '🎯', title: 'Daily word bridge challenge', desc: 'Connect two distant words' },
        { icon: '🔗', title: 'Find the linking word', desc: 'The missing bridge' },
        { icon: '🎲', title: 'Two random words to connect', desc: 'Unexpected combinations' },
        { icon: '✨', title: 'Multiple valid solutions possible', desc: 'Creative freedom' },
        { icon: '📚', title: 'Improve vocabulary and associations', desc: 'Word mastery' },
    ];

    const values = [
        { icon: Sparkles, title: 'Instant Answers', desc: 'Get today\'s Zip answer instantly without the guesswork. Save time and maintain your LinkedIn Zip streak.' },
        { icon: BookOpen, title: 'Visual Solutions', desc: 'High-quality enhanced screenshots showing the complete word bridge with zoom capability.' },
        { icon: Calendar, title: 'Daily Updates', desc: 'The Zip Today answer is updated after each new LinkedIn Zip puzzle is released. Check back daily for fresh content.' },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
            {/* What is Zip */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 mb-6">
                    <Link2 className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4">What is LinkedIn Zip?</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    LinkedIn Zip is a daily word puzzle where you find the bridge word that connects two random words together.
                    It's a creative challenge that expands your vocabulary and tests your associative thinking.
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
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-6 h-full hover:border-purple-500/40 transition-all">
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold flex items-center justify-center">
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
                <h2 className="text-3xl font-black text-white">Why Use Our Zip Answer Guide?</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Everything you need to solve Zip puzzles</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <div key={idx} className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center text-purple-400 mx-auto">
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
