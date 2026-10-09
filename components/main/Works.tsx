import { Text } from '../ui/Text';
import Image from 'next/image';
import project1 from '@/assets/works/img.webp';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { works } from '@/lib/works';
import Badge from '../ui/Badge';

export default function Works() {
	return (
		<section id='cases' className='py-(--section-y) wrapper-xl'>
			<div className='mb-[clamp(36px,5vw,64px)] flex items-end justify-between gap-6'>
				<Text variant='section' className='whitespace-nowrap'>
					Работы
				</Text>
				<Text variant='caps' className='max-w-65' color='muted'>
					Коммерческие проекты и то, что делаю для себя
				</Text>
			</div>
			<div className='grid grid-cols-1 gap-7 tab:grid-cols-2'>
				{works.map((el, i) => {
					return (
						<Link
							href={`/work/${el.id}`}
							key={el.id}
							className={cn(
								'group relative flex flex-col gap-4',
								i === 0 && 'md:col-span-2',
							)}>
							<div className='aspect-4/3 overflow-hidden bg-night-raised text-night-ink md:aspect-21/9'>
								<Image
									src={project1}
									alt=''
									className='inset-0 size-full object-cover object-[50%_30%] transition-transform duration-800 group-hover:scale-104'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<div className='flex justify-between'>
									<Text variant='title' className='whitespace-nowrap'>
										{el.title}
									</Text>

									<div className='flex flex-wrap justify-end gap-1.5'>
										{el.tags.map((item) => {
											return (
												<Badge key={el.id + item} size='sm'>
													{item}
												</Badge>
											);
										})}
									</div>
								</div>
								<Text color='muted' variant='body' className=' max-w-[36em]'>
									{el.description}
								</Text>
							</div>
							<span className='absolute top-4.5 right-4.5 flex items-center justify-center size-12 scale-0 rounded-full bg-accent text-on-accent group-hover:scale-100 transition-transform duration-400'>
								<ArrowUpRight strokeWidth={1.5} size={18} />
							</span>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
