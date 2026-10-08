import BurgerMenu from './BurgerMenu';
import DesignPopover from './DesignPopover';
import { Text } from '../ui/Text';

export default function Header() {
	return (
		<header className=' fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-40 text-night-ink mix-blend-difference'>
			<div className=' flex min-h-17 wrapper-xl  items-center justify-between '>
				<Text href='/' aria-label='logo' as='a' variant='title'>
					Максим
				</Text>
				<div className='flex items-center gap-2.5 '>
					<DesignPopover />
					<BurgerMenu />
				</div>
			</div>
		</header>
	);
}
