'use client';

import { Dialog } from '@base-ui/react/dialog';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Text } from '../ui/Text';

// TODO: заменить на реальные разделы
const links = [
	{ href: '/#cases', label: 'Кейсы' },
	{ href: '/#skills', label: 'Что умею' },
	{ href: '/#about', label: 'Обо мне' },
	{ href: '/#contacts', label: 'Контакты' },
];

// выезд текста; Base UI ждёт конца перехода у Popup, поэтому у фона та же длительность.
// Закрытие — зеркало открытия: ease-in вместо ease-out, иначе уход выглядит рывком
const slide =
	'transition-transform duration-500 ease-out data-ending-style:ease-in motion-reduce:transition-none';

export default function BurgerMenu() {
	const [open, setOpen] = useState(false);
	// портируем в #app, а не в body: там шапка с z-40 оказывается над меню (z-30)
	const container = useRef<HTMLElement | null>(null);

	useEffect(() => {
		container.current = document.getElementById('app');
	}, []);

	// modal='trap-focus' не блокирует прокрутку — делаем сами
	useEffect(() => {
		if (!open) return;
		const html = document.documentElement;
		const prev = html.style.overflow;
		html.style.overflow = 'hidden';
		return () => {
			html.style.overflow = prev;
		};
	}, [open]);

	return (
		// trap-focus: клики вне меню разрешены, иначе кнопка в шапке не закроет его
		<Dialog.Root open={open} onOpenChange={setOpen} modal='trap-focus'>
			<Dialog.Trigger
				aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
				className='group pointer-events-auto relative grid size-11 cursor-pointer place-items-center text-night-ink'>
				{/* две полоски → крестик, пока меню открыто (data-popup-open) */}
				<span className='absolute h-[1.5px] w-7.5 -translate-y-1 bg-current transition-transform duration-300 group-data-popup-open:translate-y-0 group-data-popup-open:rotate-45' />
				<span className='absolute h-[1.5px] w-7.5 translate-y-1 bg-current transition-transform duration-300 group-data-popup-open:translate-y-0 group-data-popup-open:-rotate-45' />
			</Dialog.Trigger>

			<Dialog.Portal container={container}>
				{/* чёрный фон — проявляется на месте; подпись внутри него, поэтому проявляется вместе с ним */}
				<Dialog.Backdrop className='fixed inset-0 z-30 flex flex-col justify-end bg-night-bg transition-opacity duration-500 ease-out data-ending-style:ease-in motion-reduce:transition-none data-starting-style:opacity-0 data-ending-style:opacity-0 pb-8'>
					<div className='wrapper-xl  flex w-full justify-between '>
						<Text color='night-muted' variant='caps'>
							Минск
						</Text>
						<Text color='night-muted' variant='caps'>
							Фронтенд · Vue · Nuxt
						</Text>
					</div>
				</Dialog.Backdrop>

				{/* текст — выезжает слева */}
				<Dialog.Popup
					className={`fixed inset-0 z-30 flex flex-col pt-[env(safe-area-inset-top,0px)] text-night-ink outline-none ${slide} data-starting-style:-translate-x-full data-ending-style:-translate-x-full`}>
					<Dialog.Title className='sr-only'>Меню</Dialog.Title>
					{/* видимый крестик — бургер в шапке; этот нужен скринридерам, фокус заперт внутри меню */}
					<Dialog.Close className='sr-only'>Закрыть меню</Dialog.Close>

					<nav className='wrapper-xl flex w-full flex-1 flex-col justify-center gap-2'>
						{links.map((l) => (
							<Text
								key={l.href}
								as={Link}
								href={l.href}
								variant='section'
								className='w-fit transition-colors hover:text-accent'
								// шапка живёт в layout и не перемонтируется — закрываем вручную
								onClick={() => setOpen(false)}>
								{l.label}
							</Text>
						))}
					</nav>
					
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
