import GameViewer from '@/components/GameViewer';
import GameContext from '@/components/GameContext';

// Ensure params are correctly handled in Next.js 15+ App Router
export async function generateStaticParams() {
    return [
        { slug: 'pinpoint' },
        { slug: 'queens' },
        { slug: 'zip' },
    ]
}

export default async function GamePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <GameViewer gameSlug={params.slug} />
            <GameContext slug={params.slug.replace('game/', '')} />
        </div>
    );
}
