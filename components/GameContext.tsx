'use client';

import { motion } from "framer-motion";
import { Info, HelpCircle, Trophy } from "lucide-react";

interface GameContextProps {
    slug: string;
}

export default function GameContext({ slug }: GameContextProps) {
    const contextData: Record<string, { title: string, rules: string, tip: string }> = {
        "pinpoint": {
            title: "How to Play Pinpoint",
            rules: "You are given a set of clues. Your goal is to find the single word that connects them all. The fewer clues you reveal, the higher your score.",
            tip: "Look for synonyms or categories that fit the first clue, then narrow it down as you see more."
        },
        "queens": {
            title: "Queens Rules",
            rules: "Place one Queen in each row, column, and color region. No two Queens can touch, not even diagonally.",
            tip: "Start with rows or columns that have limited options. Mark empty spots with X to keep track."
        },
        "zip": {
            title: "Mastering Zip",
            rules: "Find the bridge word that connects the two random words. It must form a valid phrase or compound word with both.",
            tip: "Think of common idioms or compound words. Example: 'Apple' + [?] + 'Pie' -> 'Pie' doesn't work? Try 'Sauce'. 'Apple Sauce', 'Sauce Pie'? No. 'Pot'. 'Apple Pot'? No. Try 'Jack'. 'Apple Jack', 'Jack Pie'?"
        }
    };

    const data = contextData[slug] || { title: "About this Game", rules: "Solve the daily puzzle.", tip: "Good luck!" };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-20 text-left"
        >
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-3 text-blue-400">
                    <Info className="w-5 h-5" />
                    <h3 className="font-bold">{data.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{data.rules}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-3 text-purple-400">
                    <HelpCircle className="w-5 h-5" />
                    <h3 className="font-bold">Pro Tip</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{data.tip}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-3 text-green-400">
                    <Trophy className="w-5 h-5" />
                    <h3 className="font-bold">Keep Your Streak</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Don't let a hard day break your streak. getting the answer here counts as a "save"!
                </p>
            </div>
        </motion.div>
    );
}
