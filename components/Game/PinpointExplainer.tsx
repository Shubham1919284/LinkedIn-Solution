'use client';

import { motion } from 'framer-motion';
import { Target, Zap, BookOpen, Calendar } from 'lucide-react';

export default function PinpointExplainer() {
    const features = [
        { icon: '🆕', title: 'New puzzle released daily', desc: 'Fresh challenge every 24 hours' },
        { icon: '🔗', title: 'Five clues with one connecting theme', desc: 'Find the hidden link' },
        { icon: '🧠', title: 'Test your lateral thinking skills', desc: 'Pattern recognition' },
        { icon: '📱', title: 'Share your results with connections', desc: 'Social proof' },
        { icon: '🔥', title: 'Build and maintain your streak', desc: 'Daily engagement' },
    ];

    const values = [
        { icon: Zap, title: 'Instant Answers', desc: 'Get today\'s pinpoint answer instantly without the guesswork. Save time and maintain your LinkedIn pinpoint streak.' },
        { icon: BookOpen, title: 'Detailed Clues', desc: 'Access all five clues with interactive explanations showing how each connects to the answer theme.' },
        { icon: Calendar, title: 'Daily Updates', desc: 'The Pinpoint Today answer is updated after each new LinkedIn Pinpoint puzzle is released. Check back daily for fresh content.' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* What is Pinpoint */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-6">
                    <Target className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4">What is LinkedIn Pinpoint?</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    LinkedIn Pinpoint is a daily word puzzle where you find the hidden connection between five clues.
                    It's a fun brain teaser that gets you thinking differently and keeps you coming back for more.
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
                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-6 h-full hover:border-blue-500/40 transition-all">
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">
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
                <h2 className="text-3xl font-black text-white">Why Use Our Pinpoint Answer Guide?</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Everything you need to solve Pinpoint puzzles</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, idx) => {
                        const Icon = value.icon;
                        return (
                            <div key={idx} className="space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto">
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
