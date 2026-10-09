'use client';
import { useEffect, useState } from 'react';
import { Text } from '../ui/Text';

const formatter = new Intl.DateTimeFormat('ru-RU', {
	hour: '2-digit',
	minute: '2-digit',
	timeZone: 'Europe/Minsk',
});

export default function NowTime() {
	const [time, setTime] = useState(() => formatter.format(new Date()));

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		const tick = () => setTime(formatter.format(new Date()));

		const timeout = setTimeout(
			() => {
				tick();
				interval = setInterval(tick, 60_000);
			},
			60_000 - (Date.now() % 60_000),
		);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, []);

	return (
		<Text
			as='p'
			variant='caps'
			color='night-muted'
			aria-hidden='true'
			className='ml-auto'
			suppressHydrationWarning>
			Минск, сейчас {time}
		</Text>
	);
}
