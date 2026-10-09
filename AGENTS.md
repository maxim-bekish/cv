<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Дизайн-токены: только то, что объявлено

Стандартная палитра, размеры и шрифты Tailwind отключены в `app/globals.css` (`--color-*`, `--text-*`, `--font-*: initial`). Используем **только** объявленные токены.

## Текст

- Текст выводим через компонент `Text` (`components/ui/Text.tsx`) с пропсами `variant` и `color`, а не голыми классами.
- Размеры: `hero-letter`, `display`, `section`, `hero`, `stat`, `lead`, `title`, `caps`, `body`, `body-sm`, `terminal`.
- Шрифты: `font-display`, `font-sans`, `font-mono`.
- Новый размер добавляется в трёх местах: `--text-*` в `@theme` (`app/globals.css`), `textSizes` (`lib/utils.ts`), `variants` в `Text.tsx`. TypeScript проверяет, что последние два совпадают.
- Нельзя: `text-sm`, `text-2xl`, `text-[20px]`, `font-[...]`, `leading-[...]`, `tracking-[...]`, `style={{ fontSize }}`.

## Цвета

- Основные: `bg`, `bg-raised`, `ink`, `ink-muted`, `line`.
- Акцент: `accent`, `accent-deep`, `accent-shade`, `on-accent`.
- Тёмные секции: `night-bg`, `night-raised`, `night-deep`, `night-ink`, `night-soft`, `night-muted`, `night-line`.
- Клавиша Enter: `key-top`, `key-bottom`.
- Пресеты кнопки «Дизайн»: `preset-orange`, `preset-lime`, `preset-sky`, `preset-pink`, `preset-yellow`, `preset-lilac`, `preset-red`, `preset-mint`.
- Плюс служебные `transparent`, `current`, `inherit`.
- Нельзя: `text-red-500`, `bg-white`, `bg-[#fff]`, hex/rgb в `className` или `style`.
- Новый цвет: переменная в `:root` (и в светлой теме, если отличается) + `--color-*` в `@theme inline`.

Произвольные значения цвета и шрифта ловит ESLint (`npm run lint`).
