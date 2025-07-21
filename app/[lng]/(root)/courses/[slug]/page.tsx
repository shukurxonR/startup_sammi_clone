import CoursesCard from '@/components/cards/courses-card'
import TopBar from '@/components/shared/top-bar'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { courses } from '@/constants/const'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import Description from './_components/description'
import Hero from './_components/hero'
import Overview from './_components/overview'

async function CoursesSlug({ params: { lng } }: LngParams) {
	const { t } = await translation(lng)

	return (
		<div>
			<TopBar label='allCourses ' extra='Full Courses Reactjs' />
			<div className='container mx-auto max-w-6xl'>
				<div className='grid grid-cols-3 gap-4 pt-12'>
					<div className='col-span-2 max-lg:col-span-3'>
						<Hero />
						<Overview />
					</div>
					<div className='col-span-1 max-lg:col-span-3'>
						<Description />
					</div>
				</div>
				<Separator className='my-12' />
				<h1 className='font-bold text-4xl font-space-grotesk'>
					{t('youMayLike')}
				</h1>
				<Carousel
					opts={{ align: 'start', loop: true }}
					className='mt-6 hidden md:flex w-full'
				>
					<CarouselContent>
						{courses.map(itm => (
							<CarouselItem
								key={itm.title}
								className='md:basis-1/2 lg:basis-1/3'
							>
								<CoursesCard {...itm} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	)
}

export default CoursesSlug
