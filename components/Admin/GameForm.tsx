'use client';

import { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Loader2, Upload, Camera } from 'lucide-react';

export default function GameForm() {
    const [loading, setLoading] = useState(false);
    const [game, setGame] = useState('pinpoint');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        try {
            const dateStr = new Date().toISOString().split('T')[0];
            const storageRef = ref(storage, `solutions/${game}/${dateStr}-${file.name}`);

            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await addDoc(collection(db, 'solutions'), {
                game,
                date: dateStr,
                imageUrl: downloadURL,
                timestamp: serverTimestamp(),
            });

            alert('Uploaded successfully!');
            setFile(null);
            setPreview(null);
        } catch (error) {
            console.error(error);
            alert('Error uploading. Check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Select Game</label>
                <select
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="w-full bg-[#12121a] border border-[#1e1e2d] rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="pinpoint">Pinpoint</option>
                    <option value="queens">Queens</option>
                    <option value="crossclimb">Crossclimb</option>
                </select>
            </div>

            <div className="border-2 border-dashed border-[#1e1e2d] rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer relative">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <div className="p-4 bg-blue-500/10 rounded-full text-blue-500">
                            <Camera className="w-8 h-8" />
                        </div>
                        <p className="font-medium">Tap to take photo or upload</p>
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={loading || !file}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <Upload className="w-5 h-5" />
                        Upload Solution
                    </>
                )}
            </button>
        </form>
    );
}
