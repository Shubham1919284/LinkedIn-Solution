'use client';

import GameCard from "@/components/GameCard";
import { motion } from "framer-motion";
import { Zap, Shield, Users } from "lucide-react";

export default function Home() {
    const games = [
        {
            title: "Pinpoint",
            slug: "game/pinpoint",
            description: "Find the hidden connection between the clues. Updated daily.",
            color: "bg-blue-600",
        },
        {
            title: "Queens",
            slug: "game/queens",
            description: "Place Queens safely on the board. No attacks allowed.",
            color: "bg-purple-600",
        },
        {
            title: "Zip",
            slug: "game/zip",
            description: "Find the bridge word that connects two random words together.",
            color: "bg-indigo-600",
        },
        {
            title: "Mini Sudoku",
            slug: "game/sudoku",
            description: "Fill the grid with numbers 1-6. No repeating numbers!",
            color: "bg-orange-500",
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-gradient-x">
                            Master the Game
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Instant answers for LinkedIn's toughest daily puzzles.
                        <br className="hidden md:block" />
                        Upload screenshots, get solutions, keep your streak alive.
                    </p>
                </motion.div>

                {/* Game Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
                >
                    {games.map((game) => (
                        <motion.div key={game.slug} variants={item}>
                            <GameCard {...game} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Value Props / "Why?" Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-20"
                >
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Instant Solutions</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Don't lose your streak. Upload a screenshot and our OCR technology instantly extracts the clues to find the answer.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Verified Accuracy</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Solutions are verified by our community of top solvers. Never submit a wrong answer again.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Community Powered</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Join thousands of daily players sharing tips, tricks, and strategies for every game mode.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
