'use client';

import { useState } from 'react';
import { Save, AlertTriangle, Check, X, RefreshCw } from 'lucide-react';

interface DataEditorProps {
    game: 'pinpoint' | 'zip' | 'queens';
    initialData: any;
    onSave: (finalData: any) => Promise<void>;
    onCancel: () => void;
}

export default function DataEditor({ game, initialData, onSave, onCancel }: DataEditorProps) {
    const [data, setData] = useState(initialData);
    const [saving, setSaving] = useState(false);

    // Helper to update specific fields for Pinpoint
    const handlePinpointUpdate = (index: number, value: string) => {
        const newLines = [...data.lines];
        newLines[index] = value;
        setData({ ...data, lines: newLines });
    };

    const handleSave = async () => {
        setSaving(true);
        // Simulate formatting data for DB
        const payload = {
            game,
            date: new Date().toISOString().split('T')[0], // Today
            ...data,
            timestamp: Date.now()
        };
        await onSave(payload);
        setSaving(false);
    };

    return (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold flex items-center">
                    <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg mr-3">
                        {game === 'zip' ? '🖼️' : '📝'}
                    </span>
                    Review & Publish: {game.toUpperCase()}
                </h2>
                <button onClick={onCancel} className="text-gray-500 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-6">
                {/* Game Specific Editors */}

                {game === 'pinpoint' && (
                    <div className="space-y-4">
                        <div className="bg-blue-500/10 p-4 rounded-lg flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-blue-300 font-bold">OCR Confidence: {data.confidence}%</p>
                                <p className="text-xs text-blue-400/70">Verify the text below matches the screenshot.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Extracted Clues / Lines used as Context</label>
                            {data.lines.map((line: string, idx: number) => (
                                <div key={idx} className="flex gap-2">
                                    <span className="text-gray-600 font-mono pt-2 text-xs w-6">{idx + 1}</span>
                                    <input
                                        type="text"
                                        value={line}
                                        onChange={(e) => handlePinpointUpdate(idx, e.target.value)}
                                        className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white focus:border-blue-500 outline-none font-mono text-sm"
                                    />
                                    <button
                                        onClick={() => {
                                            const newLines = data.lines.filter((_: any, i: number) => i !== idx);
                                            setData({ ...data, lines: newLines });
                                        }}
                                        className="text-red-500/50 hover:text-red-500 p-2"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => setData({ ...data, lines: [...data.lines, "New Clue"] })}
                                className="text-sm text-blue-400 hover:text-blue-300 ml-8"
                            >
                                + Add Missing Line
                            </button>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">Category / Answer (Manual Entry)</label>
                            <input
                                type="text"
                                placeholder="e.g. 'Types of Apples' or 'Hidden Word'"
                                className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white mt-1"
                                onChange={(e) => setData({ ...data, category: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {game === 'zip' && (
                    <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden border border-white/20 relative group">
                            {/* Visual "Enhancement" Check */}
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                                <Check className="w-3 h-3 mr-1" /> Enhanced
                            </div>
                            <img src={data.previewUrl} alt="Upload Preview" className="w-full max-h-[400px] object-contain bg-black/50" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-2">Manual Override notes</label>
                            <textarea
                                className="w-full bg-black border border-white/20 rounded p-3 text-white text-sm h-24"
                                placeholder="Add specific context about this solution if the image isn't enough..."
                            ></textarea>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="pt-6 border-t border-white/10 flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                        {saving ? 'Publishing...' : 'Publish to Live Site'}
                    </button>
                </div>
            </div>
        </div>
    );
}
