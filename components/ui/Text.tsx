import { cn, type TextSize } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

// satisfies: TS упадёт, если варианты разойдутся с textSizes из lib/utils
const variants = {
	'hero-letter': 'font-display text-hero-letter',
	display: 'font-display text-display',
	section: 'font-display text-section',
	hero: 'font-display text-hero',
	stat: 'font-display text-stat',
	lead: 'font-display text-lead',
	title: 'font-display text-title',
	caps: 'font-display text-caps uppercase',
	body: 'font-sans text-body',
	'body-sm': 'font-sans text-body-sm',
	terminal: 'font-mono text-terminal',
} satisfies Record<TextSize, string>;

const text = cva('', {
	variants: {
		variant: variants,
		color: {
			inherit: '',
			ink: 'text-ink',
			muted: 'text-ink-muted',
			accent: 'text-accent',
			'on-accent': 'text-on-accent',
			'night-ink': 'text-night-ink',
			'night-soft': 'text-night-soft',
			'night-muted': 'text-night-muted',
		},
	},
	defaultVariants: {
		variant: 'body',
		color: 'inherit',
	},
});

type Variant = NonNullable<VariantProps<typeof text>['variant']>;

// какой тег ставить, если `as` не указан
const defaultTag: Record<Variant, ElementType> = {
	'hero-letter': 'span',
	display: 'h1',
	section: 'h2',
	hero: 'p',
	stat: 'span',
	lead: 'p',
	title: 'h3',
	caps: 'p',
	body: 'p',
	'body-sm': 'p',
	terminal: 'span',
};

type TextProps<T extends ElementType> = VariantProps<typeof text> & {
	as?: T;
	className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'color' | 'className'>;

export function Text<T extends ElementType = 'p'>({
	as,
	variant,
	color,
	className,
	...props
}: TextProps<T>) {
	const Tag = as ?? defaultTag[variant ?? 'body'];
	return <Tag className={cn(text({ variant, color }), className)} {...props} />;
}
