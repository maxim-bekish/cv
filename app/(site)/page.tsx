import About from '@/components/main/About';
import Contacts from '@/components/main/Contacts';
import Faq from '@/components/main/Faq';
import Feedback from '@/components/main/Feedback';
import Hero from '@/components/main/Hero';
import Skills from '@/components/main/Skills';
import Works from '@/components/main/Works';

 
import { Marquee } from '@/components/ui/Marquee';
 
const lineTextOne = [
	{ id: crypto.randomUUID(), value: 'Frontend Developer' },
	{ id: crypto.randomUUID(), value: 'Vue / React' },
	{ id: crypto.randomUUID(), value: 'UTS+3' },
	{ id: crypto.randomUUID(), value: 'EdTech' },
	{ id: crypto.randomUUID(), value: 'E-commerce' },
	{ id: crypto.randomUUID(), value: 'Open to work' },
	{ id: crypto.randomUUID(), value: 'Full-time' },
	{ id: crypto.randomUUID(), value: 'Freelance' },
	{ id: crypto.randomUUID(), value: 'Remote' },
	{ id: crypto.randomUUID(), value: 'Минск' },
	{ id: crypto.randomUUID(), value: 'Максим Бекиш' },
];

const lineTextThree = [
	{ id: crypto.randomUUID(), value: 'Vue 3' },
	{ id: crypto.randomUUID(), value: 'React' },
	{ id: crypto.randomUUID(), value: 'Nuxt 4' },
	{ id: crypto.randomUUID(), value: 'Next.js' },
	{ id: crypto.randomUUID(), value: 'JavaScript' },
	{ id: crypto.randomUUID(), value: 'TypeScript' },
	{ id: crypto.randomUUID(), value: 'Pinia' },
	{ id: crypto.randomUUID(), value: 'Vuex' },
	{ id: crypto.randomUUID(), value: 'Redux' },
	{ id: crypto.randomUUID(), value: 'Zustand' },
	{ id: crypto.randomUUID(), value: 'MobX' },
	{ id: crypto.randomUUID(), value: 'REST API' },
	{ id: crypto.randomUUID(), value: 'GraphQL / Apollo' },
	{ id: crypto.randomUUID(), value: 'WebSocket' },
	{ id: crypto.randomUUID(), value: 'HTML' },
	{ id: crypto.randomUUID(), value: 'CSS' },
	{ id: crypto.randomUUID(), value: 'SCSS' },
	{ id: crypto.randomUUID(), value: 'Tailwind' },
	{ id: crypto.randomUUID(), value: 'GitHub' },
	{ id: crypto.randomUUID(), value: 'GitLab' },
	{ id: crypto.randomUUID(), value: 'Vite' },
	{ id: crypto.randomUUID(), value: 'Vercel' },
	{ id: crypto.randomUUID(), value: 'Figma' },
	{ id: crypto.randomUUID(), value: 'CI/CD' },
	{ id: crypto.randomUUID(), value: 'Docker' },
	{ id: crypto.randomUUID(), value: 'Claude' },
	{ id: crypto.randomUUID(), value: 'Supabase' },
];

export default function Home() {
	return (
		<main className='flex-1'>
			<Hero />
			<Marquee variant='accent' arr={lineTextOne} />
			<About />
			<Marquee variant='monochrome' arr={lineTextThree} />
			<Works />
			<Skills />
			<Feedback />
			<Faq />
			<Contacts />
		</main>
	);
}
