import { getCourses } from '@/actions/course.action'
import InstructorCourseCard from '@/components/cards/instructor-course-card'
import Header from '../_components/header'

async function Page() {
	const courses = await getCourses()
	return (
		<div>
			<Header title='My courses' description='Here are your latest courses' />
			<div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{courses.map(item => (
					<InstructorCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item))}
					/>
				))}
			</div>
		</div>
	)
}

export default Page
