'use client';

import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowRight, RotateCcw, UserRound } from 'lucide-react';
import Matter from 'matter-js';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import  photoSrc from '@/assets/preview.webp';

const { Engine, Runner, Bodies, Body, Composite, Constraint, Events } = Matter;

type Tag = { label: string; accent?: boolean };

type PhysicsHeroProps = {
	tags?: Tag[];
	 
	/** куда ведёт «Листать вниз» */
	nextHref?: string;
};

const DEFAULT_TAGS: Tag[] = [
	{ label: 'Vue 3', accent: true },
	{ label: 'Nuxt' },
	{ label: 'TypeScript' },
	{ label: 'React' },
	{ label: 'Figma' },
];

const FIRST_LINE = [...'МАКСИМ'];
const SECOND_LINE = [...'БЕКИШ'];

// пол поднят над нижней строкой HUD
const FLOOR_GAP = 64;
const WALL = 400;

// задержки сценария падения, мс
const LETTER_STEP = 70;
const LINE_PAUSE = 250;
const EXTRA_STEP = 120;

type Kind = 'letter' | 'pill' | 'photo';

type Entry = { el: HTMLElement; body: Matter.Body; w: number; h: number };

const bodyOptions: Record<Kind, (w: number, h: number) => Matter.IChamferableBodyDefinition> = {
	letter: (w, h) => ({
		chamfer: { radius: Math.min(w, h) * 0.06 },
		restitution: 0.18,
		friction: 0.35,
		frictionAir: 0.012,
		density: 0.002,
	}),
	pill: (_w, h) => ({
		chamfer: { radius: h / 2 - 1 },
		restitution: 0.45,
		friction: 0.35,
		frictionAir: 0.012,
		density: 0.0012,
	}),
	photo: () => ({
		chamfer: { radius: 2 },
		restitution: 0.18,
		friction: 0.35,
		frictionAir: 0.012,
		density: 0.002,
	}),
};

const objectClass =
	'invisible absolute top-0 left-0 block cursor-grab touch-none origin-center will-change-transform data-dragging:z-5 data-dragging:cursor-grabbing';

export default function PhysicsHero({
	tags = DEFAULT_TAGS,
 
	nextHref = '#about',
}: PhysicsHeroProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const objectsRef = useRef<HTMLDivElement>(null);
	const resetRef = useRef<() => void>(() => {});
	const [grabbed, setGrabbed] = useState(false);

	useEffect(() => {
		const section = sectionRef.current;
		const container = objectsRef.current;
		if (!section || !container) return;

		const engine = Engine.create();
		engine.gravity.y = 1.1;
		const runner = Runner.create();
		Runner.run(runner, engine);

		let entries: Entry[] = [];
		let timers: number[] = [];
		let width = 0;
		let drag: { constraint: Matter.Constraint; pointerId: number; el: HTMLElement } | null =
			null;

		const elements = Array.from(container.querySelectorAll<HTMLElement>('[data-kind]'));

		Events.on(engine, 'afterUpdate', () => {
			for (const { el, body, w, h } of entries) {
				const { x, y } = body.position;
				el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${body.angle}rad)`;
			}
		});

		const createWalls = (W: number, H: number) => {
			const opts = { isStatic: true, friction: 0.6 };
			const floorTop = H - FLOOR_GAP;
			// стены уходят на 3000px вверх: брошенное вверх не улетает за края
			const wallH = H + 3000;
			const wallY = H - wallH / 2;
			return [
				Bodies.rectangle(W / 2, floorTop + WALL / 2, W + WALL * 2, WALL, opts),
				Bodies.rectangle(-WALL / 2, wallY, WALL, wallH, opts),
				Bodies.rectangle(W + WALL / 2, wallY, WALL, wallH, opts),
				Bodies.rectangle(W / 2, -3000 - WALL / 2, W + WALL * 2, WALL, opts),
			];
		};

		const spawn = (el: HTMLElement, x: number, y: number, angle = 0) => {
			const w = el.offsetWidth;
			const h = el.offsetHeight;
			const kind = el.dataset.kind as Kind;
			const body = Bodies.rectangle(x, y, w, h, bodyOptions[kind](w, h));
			Body.setAngle(body, angle);
			el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${angle}rad)`;
			el.style.visibility = 'visible';
			entries.push({ el, body, w, h });
			Composite.add(engine.world, body);
		};

		const later = (ms: number, fn: () => void) => {
			timers.push(window.setTimeout(fn, ms));
		};

		const build = () => {
			timers.forEach(clearTimeout);
			timers = [];
			stopDrag();
			Composite.clear(engine.world, false);
			entries = [];
			for (const el of elements) {
				el.style.visibility = 'hidden';
				el.style.transform = '';
			}

			const W = section.clientWidth;
			const H = section.clientHeight;
			width = W;
			Composite.add(engine.world, createWalls(W, H));

			const byKind = (kind: Kind, line?: string) =>
				elements.filter(
					(el) =>
						el.dataset.kind === kind &&
						(line === undefined || el.dataset.line === line),
				);

			// строка падает словом: буквы стоят по местам и сыплются слева направо
			let delay = 0;
			const dropLine = (letters: HTMLElement[]) => {
				const total = letters.reduce((sum, el) => sum + el.offsetWidth, 0);
				let x = Math.max(0, (W - total) / 2);
				for (const el of letters) {
					const w = el.offsetWidth;
					const cx = x + w / 2;
					const angle = (Math.random() - 0.5) * 0.2;
					later(delay, () => spawn(el, cx, -el.offsetHeight / 2 - 20, angle));
					x += w;
					delay += LETTER_STEP;
				}
				delay += LINE_PAUSE;
			};

			const firstLine = byKind('letter', '1');
			const secondLine = byKind('letter', '2');
			dropLine(firstLine);
			dropLine(secondLine);

			// фото падает сбоку от слов, в свободную полосу справа;
			// если она уже фото — прижимаем к правой стене
			const lineWidth = (letters: HTMLElement[]) =>
				letters.reduce((sum, el) => sum + el.offsetWidth, 0);
			const wordsRight = (W + Math.max(lineWidth(firstLine), lineWidth(secondLine))) / 2;
			for (const el of byKind('photo')) {
				const w = el.offsetWidth;
				const cx = Math.min((wordsRight + W) / 2, W - w / 2);
				const angle = (Math.random() - 0.5) * 0.3;
				later(delay, () => spawn(el, cx, -el.offsetHeight / 2 - 20, angle));
				delay += EXTRA_STEP;
			}

			for (const el of byKind('pill')) {
				const w = el.offsetWidth;
				const cx = w / 2 + Math.random() * Math.max(0, W - w);
				const angle = (Math.random() - 0.5) * 0.6;
				later(delay, () => spawn(el, cx, -el.offsetHeight / 2 - 20, angle));
				delay += EXTRA_STEP;
			}
		};

		// ── перетаскивание ─────────────────────────────
		const toWorld = (e: PointerEvent) => {
			const rect = section.getBoundingClientRect();
			return { x: e.clientX - rect.left, y: e.clientY - rect.top };
		};

		function stopDrag() {
			if (!drag) return;
			Composite.remove(engine.world, drag.constraint);
			delete drag.el.dataset.dragging;
			drag = null;
		}

		const onPointerDown = (e: PointerEvent) => {
			const el = e.currentTarget as HTMLElement;
			const entry = entries.find((item) => item.el === el);
			if (!entry || drag) return;
			e.preventDefault();
			el.setPointerCapture(e.pointerId);

			const point = toWorld(e);
			const constraint = Constraint.create({
				pointA: point,
				bodyB: entry.body,
				pointB: {
					x: point.x - entry.body.position.x,
					y: point.y - entry.body.position.y,
				},
				length: 0,
				stiffness: 0.2,
				damping: 0.1,
			});
			Composite.add(engine.world, constraint);
			drag = { constraint, pointerId: e.pointerId, el };
			el.dataset.dragging = '';
			setGrabbed(true);
		};

		const onPointerMove = (e: PointerEvent) => {
			if (!drag || drag.pointerId !== e.pointerId) return;
			drag.constraint.pointA = toWorld(e);
		};

		const onPointerUp = (e: PointerEvent) => {
			if (drag?.pointerId === e.pointerId) stopDrag();
		};

		for (const el of elements) {
			el.addEventListener('pointerdown', onPointerDown);
			el.addEventListener('pointermove', onPointerMove);
			el.addEventListener('pointerup', onPointerUp);
			el.addEventListener('pointercancel', onPointerUp);
		}

		// ширина поменялась — размеры букв (clamp) тоже, собираем сцену заново
		const resizeObserver = new ResizeObserver(() => {
			if (section.clientWidth !== width) build();
		});
		resizeObserver.observe(section);

		// вне экрана физику не считаем
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			runner.enabled = entry.isIntersecting;
		});
		intersectionObserver.observe(section);

		resetRef.current = build;
		// ждём шрифты: иначе тела посчитаются по ширине запасного шрифта
		let cancelled = false;
		document.fonts.ready.then(() => {
			if (!cancelled) build();
		});

		return () => {
			cancelled = true;
			timers.forEach(clearTimeout);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			for (const el of elements) {
				el.removeEventListener('pointerdown', onPointerDown);
				el.removeEventListener('pointermove', onPointerMove);
				el.removeEventListener('pointerup', onPointerUp);
				el.removeEventListener('pointercancel', onPointerUp);
			}
			Events.off(engine, 'afterUpdate');
			Runner.stop(runner);
			Composite.clear(engine.world, false);
			Engine.clear(engine);
			resetRef.current = () => {};
		};
	}, [tags, photoSrc]);

	return (
		<section
			ref={sectionRef}
			aria-label='Первый экран'
			className='relative h-svh min-h-[560px] touch-pan-y overflow-hidden bg-night-bg text-night-ink select-none before:pointer-events-none before:absolute before:inset-0 before:bg-hero-glow'>
			<h1 className='sr-only'>Максим Бекиш — фронтенд-разработчик</h1>

			{/* физические объекты: без z-index, чтобы перетаскиваемый (z-5) поднимался над HUD */}
			<div ref={objectsRef} aria-hidden='true' className='absolute inset-0'>
				{FIRST_LINE.map((letter, i) => (
					<span key={`1-${i}`} data-kind='letter' data-line='1' className={objectClass}>
						<Text variant='hero-letter' color='night-ink' className='block'>
							{letter}
						</Text>
					</span>
				))}
				{SECOND_LINE.map((letter, i) => (
					<span key={`2-${i}`} data-kind='letter' data-line='2' className={objectClass}>
						<Text variant='hero-letter' color='accent' className='block'>
							{letter}
						</Text>
					</span>
				))}

				<span
					data-kind='photo'
					className={cn(
						objectClass,
						'aspect-[3/4] w-[clamp(120px,14vw,210px)] overflow-hidden bg-linear-to-b from-night-soft/20 to-night-raised grayscale',
					)}>
				
						<Image
							src={photoSrc}
							alt=''
							fill
							sizes='(min-width: 1500px) 210px, 14vw'
							draggable={false}
							className='pointer-events-none object-cover'
						/>
				
				</span>

				{tags.map(({ label, accent }) => (
					<span key={label} data-kind='pill' className={objectClass}>
						<Badge variant={accent ? 'active' : 'default'} size='lg'>
							{label}
						</Badge>
					</span>
				))}
			</div>

			{/* HUD */}
			<div className='pointer-events-none absolute inset-0 z-[3] flex flex-col'>
				<div className='wrapper-xl flex w-full justify-between gap-6 pt-25'>
					<div className='flex flex-col'>
						<Text variant='hero'>
							Делаю
							<br /> интерфейсы,
							<br /> которые
							<br /> хочется
							<br />
							<em className='text-accent not-italic'>потрогать</em>
						</Text>
						<div className='mt-[clamp(18px,2.4vw,28px)] flex flex-wrap items-center gap-2.5'>
							<Badge variant='pulse'>Открыт к работе</Badge>
							<Badge>Vue 3 · Nuxt · TypeScript</Badge>
							<Badge>Минск / удалённо</Badge>
						</div>
					</div>

					<div className='hidden max-w-[340px] flex-col gap-4 text-right lg:flex'>
						<Text variant='caps' color='night-ink'>
							Привет, я Максим Бекиш — фронтенд-разработчик из Минска. Собираю
							интерфейсы на Vue, Nuxt и TypeScript от макета до продакшена.
						</Text>
						<Button
							className='ml-auto'
							icon={<ArrowRight />}
							render={<a href='#contacts' />}
							nativeButton={false}>
							Написать мне
						</Button>
					</div>
				</div>

				<Text
					variant='caps'
					color='night-muted'
					className={cn(
						'absolute top-[55%] left-1/2 hidden -translate-x-1/2 whitespace-nowrap transition-opacity duration-500 lg:block',
						grabbed && 'opacity-0',
					)}>
					Хватайте буквы и бросайте
				</Text>

				<div className='mt-auto border-t border-night-ink/25'>
					<div className='wrapper-xl flex items-center justify-between gap-3 py-3'>
						<Button
							variant='ghost'
							className='[&_svg]:size-4'
							onClick={() => resetRef.current()}>
							<RotateCcw strokeWidth={1.5} />
							Собрать заново
						</Button>
						<Button
							variant='ghost'
							className='hidden sm:inline-flex [&_svg]:size-4'
							render={<a href={nextHref} />}
							nativeButton={false}>
							<ArrowDown strokeWidth={1.5} />
							Листать вниз
						</Button>
						<Button
							variant='ghost'
							render={<a href='#contacts' />}
							nativeButton={false}>
							Открыт к предложениям
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
