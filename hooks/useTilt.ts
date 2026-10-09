import { useEffect, useRef, type PointerEvent } from 'react';

const REST = { x: 8, y: -14 }; // наклон в покое: rotateX, rotateY

export function useTilt<T extends HTMLElement>(strength = 1, smooth = 0.12) {
	const ref = useRef<T>(null);
	const target = useRef({ ...REST });
	const current = useRef({ ...REST });
	const frame = useRef(0);

	const loop = () => {
		const el = ref.current;
		if (!el) return;
		const c = current.current;
		const t = target.current;
		c.x += (t.x - c.x) * smooth;
		c.y += (t.y - c.y) * smooth;
		el.style.transform = `rotateX(${c.x}deg) rotateY(${c.y}deg)`;
		el.style.setProperty('--rx', String(c.x));
		el.style.setProperty('--ry', String(c.y));
		const done = Math.abs(t.x - c.x) < 0.01 && Math.abs(t.y - c.y) < 0.01;
		frame.current = done ? 0 : requestAnimationFrame(loop);
	};

	const start = () => {
		if (!frame.current) frame.current = requestAnimationFrame(loop);
	};

	useEffect(() => () => cancelAnimationFrame(frame.current), []);

	const onPointerMove = (e: PointerEvent<HTMLElement>) => {
		if (e.pointerType !== 'mouse') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width - 0.5;
		const y = (e.clientY - r.top) / r.height - 0.5;
		target.current = { x: (-y * 18 + 4) * strength, y: (x * 26 - 6) * strength };
		start();
	};

	const onPointerLeave = () => {
		target.current = { ...REST };
		start();
	};

	return { ref, onPointerMove, onPointerLeave };
}