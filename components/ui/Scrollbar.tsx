'use client';

import { useEffect, useRef, type PointerEvent } from 'react';

const MIN_THUMB = 32; // px — чтобы на длинной странице ползунок не превращался в точку

// свой скроллбар поверх страницы: нативный спрятан утилитой `scrollbar` на <html>,
// поэтому контент доходит до правого края. Стили пишем напрямую в DOM — без ре-рендеров на скролле
export default function Scrollbar() {
	const thumb = useRef<HTMLDivElement>(null);
	// сколько px прокрутки страницы приходится на 1 px движения ползунка — нужно для перетаскивания
	const ratio = useRef(1);
	const drag = useRef<{ y: number; scroll: number } | null>(null);

	useEffect(() => {
		const el = thumb.current;
		if (!el) return;
		const root = document.documentElement;
		let frame = 0;

		const update = () => {
			frame = 0;
			const view = window.innerHeight;
			const total = root.scrollHeight;
			const height = Math.max((view / total) * view, MIN_THUMB);
			const track = view - height;
			ratio.current = track > 0 ? (total - view) / track : 1;
			el.hidden = total <= view;
			el.style.height = `${height}px`;
			el.style.transform = `translateY(${window.scrollY / ratio.current}px)`;
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		// высота страницы меняется без resize окна: картинки, шрифты, раскрытые блоки
		const ro = new ResizeObserver(schedule);
		ro.observe(document.body);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			ro.disconnect();
		};
	}, []);

	const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
		e.preventDefault(); // не выделяем текст, пока тянем
		e.currentTarget.setPointerCapture(e.pointerId);
		drag.current = { y: e.clientY, scroll: window.scrollY };
	};

	const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
		if (!drag.current) return;
		const dy = e.clientY - drag.current.y;
		window.scrollTo({ top: drag.current.scroll + dy * ratio.current, behavior: 'instant' });
	};

	const onPointerUp = () => {
		drag.current = null;
	};

	return (
		// зона захвата шире видимой полоски: тянуть 4px мышью неудобно
		<div
			ref={thumb}
			aria-hidden
			hidden
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			onPointerCancel={onPointerUp}
			className='group fixed top-0 right-0 z-50  cursor-grab touch-none active:cursor-grabbing'>
			<span className='absolute inset-y-0 right-0 w-[0.5dvw] bg-accent-shade transition-[width] duration-200 group-hover:w-[1dvw]  group-active:w-[1dvw]' />
		</div>
	);
}
