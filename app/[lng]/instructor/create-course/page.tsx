import CourseFildsForm from '@/components/forms/course-filds-form'
import { Separator } from '@/components/ui/separator'
import Header from '../_components/header'

function Page() {
	return (
		<>
			<Header
				title='Create a course'
				description='Fill in the detailes below to create a new course'
			/>

			<div className='mt-4 bg-background rounded-md p-4'>
				<h3 className='text-lg  font-medium font-space-grotesk'>
					Basic information
				</h3>
				<Separator className='my-3' />
				<CourseFildsForm />
			</div>
		</>
	)
}

export default Page
