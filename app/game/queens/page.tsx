import QueensExplainer from '@/components/Game/QueensExplainer';
import QueensImageViewer from '@/components/Game/QueensImageViewer';

export default async function QueensPage() {
    const todaysPuzzle = {
        puzzleNumber: 124,
        imageUrl: '', // Placeholder
        date: new Date().toISOString().split('T')[0],
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <QueensExplainer />
            <QueensImageViewer {...todaysPuzzle} />
        </div>
    );
}
