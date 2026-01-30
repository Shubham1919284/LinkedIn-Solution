import GameSidebar from '@/components/GameSidebar';
import MobileNav from '@/components/MobileNav';

export default function GameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen pb-20 lg:pb-0"> {/* Add padding bottom for mobile nav */}
            <GameSidebar />
            <div className="lg:pl-20 transition-all duration-300">
                {children}
            </div>
            <MobileNav />
        </div>
    );
}
