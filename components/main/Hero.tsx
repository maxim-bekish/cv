import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { ArrowDown, RotateCcw } from 'lucide-react';

export default function Hero() {
	return (
		<section className='relative pt-25 max-h-300 h-svh before:pointer-events-none before:absolute before:inset-0 before:bg-hero-glow '>
			<div className='wrapper-xl flex justify-between'>
				<div className='flex flex-col '>
					<Text variant='hero'>
						Делаю <br /> интерфейсы,
						<br /> которые
						<br /> хочется
						<br />
						<em className='not-italic text-accent'>потрогать</em>
					</Text>
					<div className='flex mt-[clamp(18px,2.4vw,28px)] flex-wrap items-center gap-2.5 '>
						<span className='inline-flex items-center gap-2 rounded-full border border-accent/60 px-3 py-1.5 font-display text-caps uppercase text-night-ink before:size-[7px] before:rounded-full before:bg-accent before:animate-ping-dot motion-reduce:before:animate-none'>
							Открыт к работе
						</span>
						<span className='rounded-full border border-night-ink/30 px-3 py-1.5 font-display text-caps uppercase text-night-soft'>
							Vue 3 · Nuxt · TypeScript
						</span>
						<span className='rounded-full border border-night-ink/30 px-3 py-1.5 font-display text-caps uppercase text-night-soft'>
							Минск / удалённо
						</span>
					</div>
				</div>
				<div className=' flex-col gap-4 hidden max-w-[340px] text-right tab:flex'>
					<Text color='night-ink' variant='caps'>
						Привет, я Максим Бекиш — фронтенд-разработчик из Минска. Собираю интерфейсы
						на Vue, Nuxt и TypeScript от макета до продакшена.
					</Text>

					<Button className='ml-auto' aria-label='Сменить акцентный цвет'>
						Написать мне
					</Button>
				</div>
			</div>
			<Text
				className='absolute pointer-events-none top-[55%] left-1/2 -translate-x-1/2 whitespace-nowrap   transition-opacity duration-500'
				color='night-muted'
				variant='caps'>
				Хватайте буквы и бросайте
			</Text>

			<div className='absolute bottom-0 w-full border-t border-night-ink/25'>
				<div className='wrapper-xl  flex  py-3  items-center justify-between gap-3   '>
					<Button variant='ghost' aria-label='Сменить акцентный цвет'>
						<RotateCcw />
						Собрать заново
					</Button>
					<Button variant='ghost' aria-label='Сменить акцентный цвет'>
						<ArrowDown />
						Листать вниз
					</Button>
					<Button variant='ghost' aria-label='Сменить акцентный цвет'>
						Открыт к предложениям
					</Button>
				</div>
			</div>
		</section>
	);
}
