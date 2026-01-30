'use client';

import { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { Upload, ArrowRight, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface OCRProcessorProps {
    game: 'pinpoint' | 'zip' | 'queens';
    onDataExtracted: (data: any) => void;
}

export default function OCRProcessor({ game, onDataExtracted }: OCRProcessorProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [logs, setLogs] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedInfo = e.target.files[0];
            setFile(selectedInfo);
            setPreview(URL.createObjectURL(selectedInfo));
            setLogs(''); // Clear logs on new file
        }
    };

    const processImage = async () => {
        if (!file || !preview) return;
        setProcessing(true);
        setLogs('Initializing Tesseract worker...');

        try {
            if (game === 'zip') {
                // Zip Logic: Just pass the image (simulating "enhancement" or raw image use)
                setLogs('Optimizing image for upload...');
                // Simulate a delay for "Enhancement"
                await new Promise(resolve => setTimeout(resolve, 1500));
                onDataExtracted({ type: 'image', file: file, previewUrl: preview });
                setProcessing(false);
                return;
            }

            // Pinpoint/Text Logic: Run OCR
            const worker = await createWorker('eng', 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        setLogs(`Scanning: ${(m.progress * 100).toFixed(0)}%`);
                    }
                }
            });

            const { data: { text } } = await worker.recognize(file);
            await worker.terminate();

            setLogs('Parsing extracted text...');
            console.log("Raw OCR Text:", text); // Debugging

            // Simple heuristic parsing for Pinpoint (extracting lines)
            // This is basic; we might need a more robust parser later.
            const lines = text.split('\n').filter(line => line.trim().length > 2);

            onDataExtracted({
                type: 'text',
                rawText: text,
                lines: lines,
                confidence: 85 // placeholder
            });

        } catch (error) {
            console.error(error);
            setLogs('Error processing image.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Zone */}
            {!preview ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
                >
                    <Upload className="w-12 h-12 text-gray-500 group-hover:text-blue-500 transition-colors mb-4" />
                    <p className="text-gray-300 font-medium">Click to Upload Screenshot</p>
                    <p className="text-gray-500 text-sm mt-1">supports JPG, PNG</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
            ) : (
                <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black">
                    <img src={preview} alt="Preview" className="w-full object-cover max-h-96 opacity-60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        {!processing ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={processImage}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full flex items-center shadow-xl mb-4"
                            >
                                {game === 'zip' ? 'Enhance & Prepare' : 'Extract Text Data'}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </motion.button>
                        ) : (
                            <div className="bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-xl flex items-center border border-white/10">
                                <Loader2 className="w-5 h-5 animate-spin mr-3 text-blue-400" />
                                <span className="font-mono text-sm">{logs}</span>
                            </div>
                        )}

                        {!processing && (
                            <button
                                onClick={() => { setFile(null); setPreview(null); }}
                                className="text-white/60 hover:text-white text-sm flex items-center mt-4 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
                            >
                                <RefreshCw className="w-3 h-3 mr-2" />
                                Replace Image
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
