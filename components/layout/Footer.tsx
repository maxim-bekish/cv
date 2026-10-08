import { Text } from '../ui/Text';

const nav = [
	{ link: '#', label: 'Главная' },
	{ link: '#', label: 'Обо мне' },
	{ link: '#', label: 'Работы' },
	{ link: '#', label: 'Что умею' },
	{ link: '#', label: 'Вопросы' },
	{ link: '#', label: 'Игры' },
	{ link: '#', label: 'Контакты' },
];
export default function Footer() {
	const time = new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Europe/Minsk',
	}).format(new Date());

	return (
		<footer className=' overflow-hidden bg-night-raised pt-[clamp(48px,6vw,72px)] text-night-ink'>
			<div className='wrapper-xl'>
				<ul className='flex flex-wrap justify-center gap-x-7 gap-y-1'>
					{nav.map((item) => {
						return (
							<li key={item.link}>
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
					<Text as='p' variant='caps' color='muted' aria-hidden='true'>
						© 2026
					</Text>
					<Text as='p' variant='caps' color='muted' aria-hidden='true'>
						ui kit
					</Text>
					<Text
						as='p'
						variant='caps'
						color='muted'
						aria-hidden='true'
						className='ml-auto'>
						Минск, сейчас {time}
					</Text>
				</div>
			</div>
			<div className='wrapper-xl '>
				<Text
					as='p'
					variant='hero-letter'
					color='night-ink'
					aria-hidden='true'
					className='text-center mt-[clamp(24px,4vw,48px)] whitespace-nowrap'>
					Максим Бекиш
				</Text>
			</div>
		</footer>
	);
}
