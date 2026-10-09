// главный цвет: --accent и --on-accent на <html>, выбор хранится в localStorage
export const ACCENT_KEY = 'accent';

export type StoredAccent = {
	/** код пресета или 'custom' */
	code: string;
	accent: string;
	onAccent: string;
};

// #f43 → #ff4433: минификатор CSS сокращает значения --preset-*
function expandHex(hex: string) {
	return hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join('')}` : hex;
}

// относительная яркость по WCAG
function luminance(hex: string) {
	const full = expandHex(hex);
	const [r, g, b] = [1, 3, 5].map((i) => {
		const c = parseInt(full.slice(i, i + 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// текст на акценте: тёмный на светлом цвете, светлый на тёмном
export function onAccentFor(hex: string) {
	return luminance(hex) > 0.18 ? '#0b0b0b' : '#f2eee6';
}

export function applyAccent(hex: string, code = 'custom') {
	const onAccent = onAccentFor(hex);
	const style = document.documentElement.style;
	style.setProperty('--accent', hex);
	style.setProperty('--on-accent', onAccent);
	try {
		const stored: StoredAccent = { code, accent: hex, onAccent };
		localStorage.setItem(ACCENT_KEY, JSON.stringify(stored));
	} catch {}
}

// обратно к цвету из globals.css
export function resetAccent() {
	const style = document.documentElement.style;
	style.removeProperty('--accent');
	style.removeProperty('--on-accent');
	try {
		localStorage.removeItem(ACCENT_KEY);
	} catch {}
}

export function readAccent(): StoredAccent | null {
	try {
		const raw = localStorage.getItem(ACCENT_KEY);
		return raw ? (JSON.parse(raw) as StoredAccent) : null;
	} catch {
		return null;
	}
}

// значение пресета из CSS (--preset-*), чтобы считать по нему --on-accent
export function presetHex(code: string) {
	return expandHex(
		getComputedStyle(document.documentElement).getPropertyValue(`--preset-${code}`).trim(),
	);
}

// выполняется в <head> до отрисовки: без него при загрузке мелькает цвет по умолчанию
export const accentInitScript = `try{var a=JSON.parse(localStorage.getItem('${ACCENT_KEY}'));if(a){var s=document.documentElement.style;s.setProperty('--accent',a.accent);s.setProperty('--on-accent',a.onAccent)}}catch(e){}`;
