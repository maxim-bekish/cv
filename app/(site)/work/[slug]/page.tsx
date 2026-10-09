import { notFound } from 'next/navigation';
import { Text } from '@/components/ui/Text';
import { works } from '@/lib/works';

// только slug из списка работ, остальные — 404
export const dynamicParams = false;

export function generateStaticParams() {
	return works.map((work) => ({ slug: work.id }));
}

export default async function Work({ params }: PageProps<'/work/[slug]'>) {
	const { slug } = await params;
	const work = works.find((w) => w.id === slug);
	if (!work) notFound();

	return (
		<section className='wrapper-xl py-(--section-y)'>
			<Text variant='display'>{work.title}</Text>
			<Text variant='lead' color='muted' className='mt-6 max-w-[36em]'>
				{work.description}
			</Text>
		</section>
	);
}
