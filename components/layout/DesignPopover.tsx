'use client';

import { Popover } from '@base-ui/react/popover';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { Text } from '../ui/Text';

// классы пишем целиком: Tailwind не увидит собранное строкой `bg-preset-${code}`
const mainColors = [
	{ code: 'orange', name: 'Оранжевый', swatch: 'bg-preset-orange' },
	{ code: 'lime', name: 'Лайм', swatch: 'bg-preset-lime' },
	{ code: 'sky', name: 'Голубой', swatch: 'bg-preset-sky' },
	{ code: 'pink', name: 'Розовый', swatch: 'bg-preset-pink' },
	{ code: 'yellow', name: 'Жёлтый', swatch: 'bg-preset-yellow' },
	{ code: 'lilac', name: 'Сиреневый', swatch: 'bg-preset-lilac' },
	{ code: 'red', name: 'Красный', swatch: 'bg-preset-red' },
	{ code: 'mint', name: 'Мятный', swatch: 'bg-preset-mint' },
];

const DEFAULT_COLOR = mainColors[0].code;

// меняем --accent на <html>: от него зависят все accent-классы и --accent-deep
function applyAccent(value: string | null) {
	const style = document.documentElement.style;
	if (value) style.setProperty('--accent', value);
	else style.removeProperty('--accent');
}

// кнопка «Дизайн» + попап выбора главного цвета
export default function DesignPopover() {
	// код пресета или 'custom' для своего цвета
	const [color, setColor] = useState(DEFAULT_COLOR);

	function selectPreset(code: string) {
		setColor(code);
		applyAccent(code === DEFAULT_COLOR ? null : `var(--preset-${code})`);
	}

	return (
		<Popover.Root>
			<Popover.Trigger
				render={
					<Button aria-label='Сменить акцентный цвет' variant='accent'>
						<span className='size-4.5 rounded-full bg-accent ring-3 ring-accent/30 transition-colors duration-300 xs:-ml-1'></span>
						<span className='hidden xs:inline'>Дизайн</span>
					</Button>
				}
			/>
			<Popover.Portal>
				<Popover.Positioner sideOffset={8}>
					<Popover.Popup className='w-[min(320px,calc(100vw-32px))] origin-top-right border border-night-line bg-night-raised p-5 text-night-ink transition-[opacity,translate,scale] duration-300 [[hidden]]:pointer-events-none [[hidden]]:invisible [[hidden]]:block [[hidden]]:-translate-y-2 [[hidden]]:scale-96 [[hidden]]:opacity-0'>
						<Text className='mb-1' variant='title'>
							Главный Цвет
						</Text>
						<Text className='mb-4' variant='body-sm' color='night-muted'>
							Весь сайт собран на CSS-переменных — выберите цвет, и он поменяется везде.
						</Text>
						<div className='mb-4 grid grid-cols-4 gap-2.5' id='dz-swatches'>
							{mainColors.map((c) => (
								<button
									key={c.code}
									className={cn(
										c.swatch,
										`dz-sw relative aspect-square min-h-10 cursor-pointer rounded-full  transition-transform duration-200 hover:scale-107 aria-pressed:after:absolute aria-pressed:after:-inset-1 aria-pressed:after:rounded-full 
										aria-pressed:after:border aria-pressed:after:border-night-ink`,
									)}
									onClick={() => selectPreset(c.code)}
									type='button'
									data-token={`--preset-${c.code}`}
									aria-label={c.name}
									aria-pressed={c.code === color}></button>
							))}
						</div>
						<div className='flex items-center justify-between gap-3 border-t border-night-ink/12 pt-3.5'>
							<label className='inline-flex min-h-11 cursor-pointer items-center gap-2.5 font-display text-caps uppercase'>
								<input
									className='size-8.5 cursor-pointer border-0 bg-transparent p-0'
									type='color'
									id='dz-custom'
									onChange={(e) => {
										setColor('custom');
										applyAccent(e.target.value);
									}}
								/>
								Свой цвет
							</label>
							<button
								className='min-h-11 cursor-pointer font-display text-caps uppercase text-night-muted hover:text-night-ink'
								id='dz-reset'
								onClick={() => selectPreset(DEFAULT_COLOR)}
								type='button'>
								Сбросить
							</button>
						</div>
					</Popover.Popup>
				</Popover.Positioner>
			</Popover.Portal>
		</Popover.Root>
	);
}
