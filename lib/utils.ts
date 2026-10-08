import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const textSizes = [
	'hero-letter',
	'display',
	'section',
	'hero',
	'stat',
	'lead',
	'title',
	'caps',
	'body',
	'body-sm',
	'terminal',
] as const;

export type TextSize = (typeof textSizes)[number];

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [{ text: [...textSizes] }],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
