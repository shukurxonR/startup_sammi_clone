import { ICategory } from '@/types'
import Image from 'next/image'

function CategoryCard(category: ICategory) {
	return (
		<div>
			<div className='flex h-44 max-md:h-36 w-full items-center justify-center rounded-md bg-secondary '>
				<Image
					src={category.icon}
					alt={category.label}
					width={100}
					height={100}
				/>
			</div>
			<h2 className='font-space-grotesk mt-2 line-clamp-1 text-lg'>
				{category.label}
			</h2>
		</div>
	)
}

export default CategoryCard
