export interface Work {
	id: string;
	title: string;
	description: string;
	link: string;
	image: string;
	tags: string[];
}

export const works: Work[] = [
	{
		id: 'mentor-ai',
		title: 'MentorAI',
		description:
			'ИИ-помощник для школьного учителя: проверка работ, планы уроков, контрольные и видеоуроки за минуты.',
		link: 'https://mentor-ai.ru',
		image: 'https://picsum.photos/id/10/400/200',
		tags: ['Vue', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
	},
	{
		id: 'a5-leasing',
		title: 'Лизинг A5',
		description: 'Сайт лизинговой компании',
		link: 'https://a5-leasing.ru/',
		image: 'https://picsum.photos/id/10/400/200',
		tags: ['1С-Битрикс', 'PHP', 'HTML', 'CSS', 'jQuery'],
	},
	{
		id: 'soberizabor',
		title: 'Собери забор',
		description: 'Лендинг алюминиевых ограждений с онлайн-калькулятором стоимости',
		link: 'https://soberizabor.ru/',
		image: 'https://picsum.photos/id/10/400/200',
		tags: ['Astro', 'HTML', 'CSS', 'JavaScript'],
	},
	{
		id: 'zelectronic',
		title: 'Зелектроник',
		description: 'Интернет-магазин сети комиссионных магазинов техники на Дальнем Востоке',
		link: 'https://zelectronic.ru/',
		image: 'https://picsum.photos/id/10/400/200',
		tags: ['1С-Битрикс', 'PHP', 'HTML', 'CSS', 'JavaScript'],
	},
	{
		id: 'photographer-portfolio',
		title: 'Сайт фотографа',
		description: 'Портфолио фотографа с галереями работ',
		link: 'https://photo-two-eta.vercel.app/',
		image: 'https://picsum.photos/id/10/400/200',
		tags: ['React', 'Next.js', 'TypeScript', 'GSAP'],
	},
	{
		id: 'ranepa-campus',
		title: 'РАНХиГС',
		description: 'Система управления кампусом',
		link: 'https://demo.campus.ranepa.ru/sign-in/secret-link',
		image: 'https://picsum.photos/id/10/400/200',
		tags: ['Nuxt', 'TypeScript', 'SCSS', 'PixiJS'],
	},
	{
		id: 'sibur-annual-report',
		title: 'Сибур',
		description: 'Интерактивный интегрированный годовой отчёт за 2024 год',
		link: 'https://ar24.sibur.ru/',
		image: 'https://picsum.photos/id/10/400/200',
		tags: ['Astro', 'HTML', 'CSS', 'JavaScript', 'GSAP'],
	},
];
