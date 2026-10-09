import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '../ui/Text';

interface BadgeProps {
	variant?: 'pulse' | 'active' | 'default';
	size?: 'sm' | 'md' | 'lg';
	children: ReactNode;
	className?: string;
}

const classes = {
	variant: {
		pulse: 'before:size-[7px] before:rounded-full before:bg-accent before:animate-ping-dot motion-reduce:before:animate-none border-accent/60',
		active: 'border-accent bg-accent text-on-accent',
		default: 'border-night-ink/30 text-night-soft',
	},
	size: {
		sm: 'px-2.5 py-1',
		md: 'px-3 py-1.5',
		lg: 'min-h-[clamp(38px,3.8vw,48px)]  px-[clamp(16px,1.6vw,22px)]',
	},
};
export default function Badge({
	variant = 'default',
	size = 'md',
	children,
	className = '',
}: BadgeProps) {
	return (
		<Text
			variant='caps'
			className={cn(
				className,
				'border rounded-full inline-flex gap-2 items-center',
				classes.variant[variant],
				classes.size[size],
			)}>
			{children}
		</Text>
	);
}
