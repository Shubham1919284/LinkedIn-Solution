import PinpointExplainer from '@/components/Game/PinpointExplainer';
import PinpointCountdown from '@/components/Game/PinpointCountdown';
import PinpointImageViewer from '@/components/Game/PinpointImageViewer';
import PinpointArchive from '@/components/Game/PinpointArchive';

export default async function PinpointPage() {
    const nextUnlock = new Date();
    nextUnlock.setHours(13); // 1 PM
    nextUnlock.setMinutes(0);
    nextUnlock.setSeconds(0);

    // If 1 PM already passed today, set to tomorrow 1 PM
    if (nextUnlock < new Date()) {
        nextUnlock.setDate(nextUnlock.getDate() + 1);
    }
    const todaysPuzzle = {
        puzzleNumber: 640,
        imageUrl: '', // This will be populated from DB when real
        date: new Date().toISOString().split('T')[0],
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <PinpointExplainer />
            <PinpointCountdown nextUnlock={nextUnlock} />
            {/* Replaced ClueReveal with ImageViewer as requested */}
            <PinpointImageViewer {...todaysPuzzle} />
            <PinpointArchive />
        </div>
    );
}
