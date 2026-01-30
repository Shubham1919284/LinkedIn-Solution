'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, FileText, Image as ImageIcon, Crown, CheckCircle, LogOut, Grid3X3 } from 'lucide-react';
import ImageUploader from '@/components/Admin/ImageUploader';
import { publishGameAction } from '@/app/actions';
import { publishDailyGame } from '@/lib/db';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedGame, setSelectedGame] = useState<'pinpoint' | 'zip' | 'queens' | 'sudoku' | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '20042012') {
            setIsAuthenticated(true);
        }
    };

    const handleImageSelected = (file: File) => {
        setUploadFile(file);
    };

    const handlePublish = async () => {
        if (!selectedGame || !uploadFile) return;

        setIsPublishing(true);
        try {
            // NEW: Use Server Action to bypass CORS
            const formData = new FormData();
            formData.append('game', selectedGame);
            formData.append('file', uploadFile);

            const result = await publishGameAction(formData);

            if (!result.success) {
                throw new Error(result.error);
            }

            setPublishSuccess(true);
            setTimeout(() => {
                setPublishSuccess(false);
                setUploadFile(null);
                setSelectedGame(null);
            }, 3000);
        } catch (error) {
            alert("Error publishing: " + error);
        } finally {
            setIsPublishing(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-zinc-900 border border-white/10 p-8 rounded-2xl w-full max-w-md"
                    onSubmit={handleLogin}
                >
                    <div className="flex justify-center mb-6 text-blue-500">
                        <Lock className="w-12 h-12" />
                    </div>
                    <h1 className="text-2xl font-bold text-white text-center mb-6">Restricted Access</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Admin Password"
                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Unlock Dashboard
                    </button>
                </motion.form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Solvr Admin
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Upload Daily Screenshots</p>
                    </div>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Lock
                    </button>
                </header>

                {publishSuccess ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-green-500/10 rounded-2xl border border-green-500/20 animate-fade-in-up">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-green-400">Published Successfully!</h2>
                        <p className="text-gray-400 mt-2">The screenshot is live on the site.</p>
                    </div>
                ) : !selectedGame ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <button
                            onClick={() => setSelectedGame('pinpoint')}
                            className="p-8 bg-zinc-900 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left group"
                        >
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Pinpoint</h3>
                            <p className="text-gray-400 text-sm">Upload Screenshot</p>
                        </button>

                        <button
                            onClick={() => setSelectedGame('zip')}
                            className="p-8 bg-zinc-900 border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-left group"
                        >
                            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Zip</h3>
                            <p className="text-gray-400 text-sm">Upload Screenshot</p>
                        </button>

                        <button
                            onClick={() => setSelectedGame('queens')}
                            className="p-8 bg-zinc-900 border border-white/10 rounded-2xl hover:border-green-500/50 hover:bg-green-500/5 transition-all text-left group"
                        >
                            <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
                                <Crown className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Queens</h3>
                            <p className="text-gray-400 text-sm">Upload Screenshot</p>
                        </button>

                        <button
                            onClick={() => setSelectedGame('sudoku')}
                            className="p-8 bg-zinc-900 border border-white/10 rounded-2xl hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-left group"
                        >
                            <div className="bg-orange-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                                <Grid3X3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Sudoku</h3>
                            <p className="text-gray-400 text-sm">Upload Screenshot</p>
                        </button>
                    </div>
                ) : (
                    <div className="animate-fade-in-up">
                        <button
                            onClick={() => { setSelectedGame(null); setUploadFile(null); }}
                            className="mb-8 text-gray-400 hover:text-white flex items-center text-sm"
                        >
                            ← Back to selection
                        </button>

                        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-2xl font-bold mb-6 capitalize flex items-center gap-3">
                                {selectedGame === 'pinpoint' && <FileText className="text-blue-500" />}
                                {selectedGame === 'zip' && <ImageIcon className="text-purple-500" />}
                                {selectedGame === 'queens' && <Crown className="text-green-500" />}
                                {selectedGame === 'sudoku' && <Grid3X3 className="text-orange-500" />}
                                {selectedGame} Upload
                            </h2>

                            <ImageUploader
                                game={selectedGame}
                                onImageSelected={handleImageSelected}
                            />

                            {uploadFile && (
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <button
                                        onClick={handlePublish}
                                        disabled={isPublishing}
                                        className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2
                                    ${selectedGame === 'pinpoint' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : ''}
                                    ${selectedGame === 'zip' ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/20' : ''}
                                    ${selectedGame === 'queens' ? 'bg-green-600 hover:bg-green-500 shadow-green-900/20' : ''}
                                    ${selectedGame === 'sudoku' ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20' : ''}
                                    ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                                    >
                                        {isPublishing ? 'Publishing...' : 'Publish Screenshot'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
