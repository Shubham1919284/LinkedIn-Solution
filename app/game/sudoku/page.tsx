import SudokuExplainer from '@/components/Game/SudokuExplainer';
import SudokuImageViewer from '@/components/Game/SudokuImageViewer';

export default async function SudokuPage() {
    const todaysPuzzle = {
        puzzleNumber: 88,
        imageUrl: '', // Placeholder
        date: new Date().toISOString().split('T')[0],
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <SudokuExplainer />
            <SudokuImageViewer {...todaysPuzzle} />
        </div>
    );
}
