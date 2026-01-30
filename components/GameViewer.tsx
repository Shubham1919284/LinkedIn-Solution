'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Loader2, Calendar, FileText, ImageIcon } from 'lucide-react';

interface GameViewerProps {
    gameSlug: string;
}

interface Solution {
    game: string;
    imageUrl?: string;
    lines?: string[];
    category?: string;
    date: string;
    timestamp: any;
}

export default function GameViewer({ gameSlug }: GameViewerProps) {
    const [solution, setSolution] = useState<Solution | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query for the specific game, latest first
        const q = query(
            collection(db, 'solutions'),
            where('game', '==', gameSlug.replace('game/', '')), // normalize slug
            orderBy('timestamp', 'desc'),
            limit(1)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data() as Solution;
                setSolution(data);
            } else {
                setSolution(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [gameSlug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!solution) {
        return (
            <div className="text-center p-12 text-gray-500 border border-white/10 rounded-2xl bg-white/5">
                <p>No verified solution for today yet.</p>
                <p className="text-sm mt-2">Check back in a few minutes!</p>
            </div>
        );
    }

    const isPinpoint = solution.game === 'pinpoint';

    return (
        <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white capitalize flex items-center">
                    {isPinpoint ? <FileText className="w-5 h-5 mr-2 text-blue-400" /> : <ImageIcon className="w-5 h-5 mr-2 text-indigo-400" />}
                    {solution.category || `${solution.game} Solution`}
                </h2>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{solution.date}</span>
                </div>
            </div>

            <div className="glass-card p-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
                {isPinpoint && solution.lines && solution.lines.length > 0 ? (
                    <div className="bg-zinc-900/90 p-8">
                        <div className="space-y-3">
                            {solution.lines.map((line, idx) => (
                                <div key={idx} className="flex items-center p-4 bg-black/40 border border-white/5 rounded-xl text-lg font-medium tracking-wide">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold mr-4">
                                        {idx + 1}
                                    </span>
                                    {line}
                                </div>
                            ))}
                        </div>
                        {solution.category && (
                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">The Connection Is</p>
                                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    {solution.category}
                                </p>
                            </div>
                        )}
                    </div>
                ) : solution.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={solution.imageUrl}
                        alt={`Solution for ${gameSlug}`}
                        className="w-full h-auto rounded-xl"
                    />
                ) : (
                    <div className="p-8 text-center text-red-400">
                        Error: Invalid Data Format
                    </div>
                )}
            </div>
        </div>
    );
}
