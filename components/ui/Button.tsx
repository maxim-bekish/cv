'use client';

import { cn } from '@/lib/utils';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

const button = cva(
	// data-disabled ставит Base UI — работает и для не-<button> через render
	'pointer-events-auto inline-flex h-10 cursor-pointer items-center justify-center font-display text-caps uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent data-disabled:pointer-events-none data-disabled:opacity-50 w-fit',
	{
		variants: {
			variant: {
				// прямоугольная с обводкой и квадратом-стрелкой справа
				primary:
					'group border border-night-ink/55 text-night-ink hover:border-night-bg hover:bg-night-ink hover:text-night-bg',
				// полупрозрачная «таблетка», как кнопка «Дизайн» в шапке
				accent: 'gap-2.5 rounded-full border border-night-ink/25 bg-night-bg/60 px-2.5 text-night-ink backdrop-blur-[10px] hover:border-accent xs:px-3.5',
				// текстовая с иконкой: «Собрать заново», «Листать вниз»
				ghost: 'gap-2 text-night-ink hover:text-accent',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	},
);

type ButtonProps = BaseButton.Props &
	VariantProps<typeof button> & {
		/**
		 * Иконка в квадрате справа (только для primary): `icon={<Download />}`.
		 * Элемент, а не компонент: Button клиентский, а компонент нельзя передать из серверного.
		 */
		icon?: ReactNode;
	};

export function Button({
	variant = 'primary',
	icon = <ArrowRight />,
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<BaseButton
			// className у Base UI может быть функцией от состояния — поддерживаем оба вида
			className={(state) =>
				cn(
					button({ variant }),
					typeof className === 'function' ? className(state) : className,
				)
			}
			{...props}>
			{variant === 'primary' ? (
				<>
					<span className='px-4'>{children}</span>
					{/* квадрат со стрелкой: высота = высоте кнопки без рамки */}
					<span className='flex aspect-square h-full items-center justify-center [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:[stroke-width:1.5] border-l border-night-ink/55 transition-colors duration-300 group-hover:border-night-bg'>
						{icon}
					</span>
				</>
			) : (
				children
			)}
		</BaseButton>
	);
}
