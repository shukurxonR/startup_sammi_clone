'use client'

import { Flag } from 'lucide-react'
import ReactStars from 'react-rating-stars-component'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'

function InstructorReviewCard() {
	return (
		<div className='flex gap-4 border-b pb-4'>
			<div className='flex-1'>
				<div className='flex gap-3'>
					<Avatar>
						<AvatarFallback className='uppercase'>SB</AvatarFallback>
					</Avatar>

					<div className='flex flex-col'>
						<div className='font-space-grotesk text-sm'>
							Samar Badriddinov{' '}
							<span className='text-xs text-muted-foreground'>3 Days ago</span>
						</div>
						<ReactStars value={4.5} edit={false} />
						<div className='font-space-grotesk font-bold'>
							Full Course ReactJS
						</div>
						<p className='text-sm text-muted-foreground'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
							voluptate corporis ratione esse. Voluptates quam sit suscipit rem
							odio quo non repudiandae, delectus voluptas ipsa hic veniam sunt.
							Vitae, sunt?
						</p>
					</div>
				</div>
			</div>
			<Button size={'icon'} variant={'ghost'} className='self-start'>
				<Flag className='text-muted-foreground' />
			</Button>
		</div>
	)
}

export default InstructorReviewCard
