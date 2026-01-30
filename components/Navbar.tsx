import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
                            <Gamepad2 className="w-8 h-8 text-blue-500" />
                            <span className="font-bold text-xl tracking-tight">Solvr</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* We can add a simple generic 'Admin' link for now, or hide it */}
                        <Link href="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Upload
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
