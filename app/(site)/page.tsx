import About from '@/components/main/About';
import Contacts from '@/components/main/Contacts';
import PhysicsHero from '@/components/sections/PhysicsHero';
import Skills from '@/components/main/Skills';
import Works from '@/components/main/Works';

import { Marquee } from '@/components/ui/Marquee';

const lineTextOne = [
	'Frontend Developer',
	'Vue / React',
	'UTC+3',
	'EdTech',
	'E-commerce',
	'Open to work',
	'Full-time',
	'Freelance',
	'Remote',
	'Минск',
	'Максим Бекиш',
];

const lineTextThree = [
	'Vue 3',
	'React',
	'Nuxt 4',
	'Next.js',
	'JavaScript',
	'TypeScript',
	'Pinia',
	'Vuex',
	'Redux',
	'Zustand',
	'MobX',
	'REST API',
	'GraphQL / Apollo',
	'WebSocket',
	'HTML',
	'CSS',
	'SCSS',
	'Tailwind',
	'GitHub',
	'GitLab',
	'Vite',
	'Vercel',
	'Figma',
	'CI/CD',
	'Docker',
	'Claude',
	'Supabase',
];

export default function Home() {
	return (
		<>
			<PhysicsHero  />
			<Marquee variant='accent' arr={lineTextOne} />
			<About />
			<Marquee variant='monochrome' arr={lineTextThree} />
			<Works />
			<Skills />
			{/* <Feedback />
			<Faq /> */}
			<Contacts />
		</>
	);
}
