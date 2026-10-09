import { Text } from './Text';
import { cn } from '@/lib/utils';

interface MarqueeProps {
	arr: string[];
	variant: 'accent' | 'monochrome';
	// сколько раз повторить список внутри копии — чтобы копия была шире экрана
	repeat?: number;
}

const cl = {
	accent: 'bg-accent text-on-accent',
	monochrome: 'border-y border-line',
};
export const Marquee = ({ arr, variant, repeat = 3 }: MarqueeProps) => {
	const items = Array.from({ length: repeat }, () => arr).flat();

	// две одинаковые копии едут друг за другом — шов не виден, лента бесконечная
	const group = (hidden?: boolean) => (
		<div
			aria-hidden={hidden}
			style={{ animationDuration: `${repeat * 60}s` }}
			className='flex shrink-0 animate-marquee motion-reduce:animate-none'>
			{items.map((item, i) => {
				return (
					<Text
						// span, а не h3 по умолчанию: пункты ленты — не заголовки
						as='span'
						variant='title'
						key={i}
						color={
							variant !== 'accent'
								? (i % arr.length) % 3 === 0
									? 'ink'
									: 'muted'
								: 'inherit'
						}
						className={cn('pr-13', variant === 'accent' && 'uppercase')}>
						{item}
					</Text>
				);
			})}
		</div>
	);

	return (
		<section className={cn('flex overflow-hidden py-3.5 whitespace-nowrap', cl[variant])}>
			{group()}
			{group(true)}
		</section>
	);
};
