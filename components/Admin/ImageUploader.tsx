'use client';

import { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
    game: 'pinpoint' | 'zip' | 'queens' | 'sudoku';
    onImageSelected: (file: File, preview: string) => void;
}

export default function ImageUploader({ game, onImageSelected }: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            onImageSelected(file, objectUrl);
        }
    };

    const clearImage = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getThemeColor = () => {
        switch (game) {
            case 'pinpoint': return 'border-blue-500/50 hover:bg-blue-500/10 text-blue-400';
            case 'zip': return 'border-purple-500/50 hover:bg-purple-500/10 text-purple-400';
            case 'queens': return 'border-green-500/50 hover:bg-green-500/10 text-green-400';
            case 'sudoku': return 'border-orange-500/50 hover:bg-orange-500/10 text-orange-400';
        }
    };

    return (
        <div className="space-y-6">
            {!preview ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all group ${getThemeColor()}`}
                >
                    <Upload className="w-12 h-12 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <p className="font-medium text-white">Click to Upload {game} Screenshot</p>
                    <p className="text-gray-500 text-sm mt-1">Supports JPG, PNG</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
            ) : (
                <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black animate-fade-in-up">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="w-full object-contain max-h-[500px]" />

                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={clearImage}
                            className="bg-black/50 hover:bg-red-500/80 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border border-white/10">
                            <Check className="w-4 h-4 inline mr-2 text-green-400" />
                            Ready to Publish
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
