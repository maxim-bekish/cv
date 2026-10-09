import { flushSync } from 'react-dom';

type RevealOptions = {
	duration?: number;
	/** старое состояние сворачивается в origin, а не новое раскрывается из него */
	reverse?: boolean;
};

// текущий переход: повторный клик сначала обрывает предыдущий
let current: ViewTransition | null = null;

// меняет состояние страницы «волной» — кругом от центра origin (или экрана)
export function circularReveal(
	update: () => void,
	origin?: HTMLElement | null,
	{ duration = 700, reverse = false }: RevealOptions = {},
) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (typeof document.startViewTransition !== 'function' || reduced) {
		update();
		return;
	}

	const rect = origin?.getBoundingClientRect();
	const x = rect ? rect.left + rect.width / 2 : innerWidth / 2;
	const y = rect ? rect.top + rect.height / 2 : innerHeight / 2;
	const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

	current?.skipTransition();

	const html = document.documentElement;
	html.classList.add('vt-reveal');
	html.classList.toggle('vt-reverse', reverse);

	// flushSync: setState внутри update должен попасть в снимок «после»
	const transition = document.startViewTransition(() => flushSync(update));
	current = transition;

	const small = `circle(0px at ${x}px ${y}px)`;
	const big = `circle(${r}px at ${x}px ${y}px)`;

	transition.ready
		.then(() => {
			html.animate(
				{ clipPath: reverse ? [big, small] : [small, big] },
				{
					duration,
					easing: 'cubic-bezier(.2,.8,.2,1)',
					pseudoElement: reverse
						? '::view-transition-old(root)'
						: '::view-transition-new(root)',
				},
			);
		})
		.catch(() => {});

	transition.finished
		.finally(() => {
			// классы снимает только последний переход: прерванный не должен трогать новый
			if (current !== transition) return;
			current = null;
			html.classList.remove('vt-reveal', 'vt-reverse');
		})
		.catch(() => {});
}
