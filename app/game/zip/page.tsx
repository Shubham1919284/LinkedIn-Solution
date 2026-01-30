import ZipExplainer from '@/components/Game/ZipExplainer';
import ZipImageViewer from '@/components/Game/ZipImageViewer';

export default async function ZipPage() {
    const todaysPuzzle = {
        puzzleNumber: 45,
        imageUrl: '/placeholder-zip.png', // Replace with real data from Firestore
        explanation: 'Found the perfect bridge word connecting these two distant concepts. The connection became clear once I considered multiple meanings.',
        date: '2026-01-29',
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <ZipExplainer />
            <ZipImageViewer {...todaysPuzzle} />
        </div>
    );
}
