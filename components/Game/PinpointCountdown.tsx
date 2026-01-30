'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';

interface PinpointCountdownProps {
    nextUnlock: Date;
}

export default function PinpointCountdown({ nextUnlock }: PinpointCountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const targetTime = nextUnlock.getTime();
            const difference = targetTime - now;

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [nextUnlock]);

    const formatTime = (num: number) => String(num).padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-4 py-8"
        >
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-bold text-white">Next Puzzle Unlocks In</h3>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-center">
                        <div className="bg-blue-600 text-white rounded-xl px-6 py-4 min-w-[100px]">
                            <div className="text-5xl font-black">{formatTime(timeLeft.hours)}</div>
                            <div className="text-sm text-blue-200 mt-2">Hours</div>
                        </div>
                    </div>

                    <div className="text-4xl font-bold text-blue-400">:</div>

                    <div className="text-center">
                        <div className="bg-blue-600 text-white rounded-xl px-6 py-4 min-w-[100px]">
                            <div className="text-5xl font-black">{formatTime(timeLeft.minutes)}</div>
                            <div className="text-sm text-blue-200 mt-2">Minutes</div>
                        </div>
                    </div>

                    <div className="text-4xl font-bold text-blue-400">:</div>

                    <div className="text-center">
                        <div className="bg-blue-600 text-white rounded-xl px-6 py-4 min-w-[100px]">
                            <div className="text-5xl font-black">{formatTime(timeLeft.seconds)}</div>
                            <div className="text-sm text-blue-200 mt-2">Seconds</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>LinkedIn Pinpoint #640 will unlock at {nextUnlock.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
            </div>
        </motion.div>
    );
}
