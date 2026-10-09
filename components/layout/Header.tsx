import BurgerMenu from './BurgerMenu';
import DesignPopover from './DesignPopover';
import { Text } from '../ui/Text';

// общий ряд шапки: слои лежат друг на друге и выравниваются одинаково
const row =
	'pointer-events-none fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-40';
const inner = 'wrapper-xl flex min-h-17 items-center';

// три слоя вместо одного, потому что mix-blend-difference ломает кнопку «Дизайн»:
// её тёмная подложка инвертируется, а backdrop-blur внутри смешиваемого слоя не видит страницу.
// Логотип и бургер инвертируются, «Дизайн» — нет. Порядок в DOM = порядок фокуса.
export default function Header() {
	return (
		<header>
			<div className={`${row} text-night-ink mix-blend-difference`}>
				<div className={inner}>
					<Text href='/' aria-label='logo' as='a' variant='title' className='pointer-events-auto'>
						Максим
					</Text>
				</div>
			</div>
			<div className={row}>
				<div className={`${inner} justify-end gap-2.5`}>
					<DesignPopover />
					{/* место под бургер из слоя ниже */}
					<span aria-hidden className='size-11' />
				</div>
			</div>
			<div className={`${row} text-night-ink mix-blend-difference`}>
				<div className={`${inner} justify-end`}>
					<BurgerMenu />
				</div>
			</div>
		</header>
	);
}
