import NowTime from '../ui/NowTime';
import { Text } from '../ui/Text';

const nav = [
	{ link: '/', label: 'Главная' },
	{ link: '/#about', label: 'Обо мне' },
	{ link: '/#cases', label: 'Работы' },
	// { link: '/#skills', label: 'Что умею' },
	// { link: '#', label: 'Вопросы' },
	// TODO: вернуть, когда появится страница /games
	// { link: '/games', label: 'Игры' },
	{ link: '/#contacts', label: 'Контакты' },
];
export default function Footer() {
	return (
		<footer className='overflow-hidden bg-night-raised pt-[clamp(48px,6vw,72px)] text-night-ink'>
			<div className='wrapper-xl'>
				<ul className='flex flex-wrap justify-center gap-x-7 gap-y-1'>
					{nav.map((item) => {
						return (
							<li key={item.label}>
								<a
									className='inline-flex min-h-11 items-center font-display text-caps uppercase text-night-ink hover:text-accent'
									href={item.link}>
									{item.label}
								</a>
							</li>
						);
					})}
				</ul>
				<div className='flex gap-4 mt-6'>
					<Text as='p' variant='caps' color='night-muted'>
						© 2026
					</Text>
					<Text as='p' variant='caps' color='night-muted'>
						ui kit
					</Text>
					<NowTime />
				</div>
			</div>
			<div className='wrapper-xl'>
				<Text
					as='p'
					variant='hero-letter'
					color='night-ink'
					aria-hidden='true'
					className='text-center mt-[clamp(24px,4vw,48px)] whitespace-nowrap translate-y-0.5 pointer-events-none'>
					Максим Бекиш
				</Text>
			</div>
		</footer>
	);
}
