'use server'

import { ICourses } from '@/app.types'
import Course from '@/database/couse.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { ICreateCourse } from './types'
// ? Post
export const createCourse = async (data: ICreateCourse) => {
	try {
		await connectToDatabase()
		await Course.create(data)
		revalidatePath('/en/instructor/my-courses')
	} catch {
		throw new Error('Soething went wrong while creating course!')
	}
}
// ? Get
export const getCourses = async () => {
	try {
		await connectToDatabase()
		const courses = await Course.find()
		return courses as ICourses[]
	} catch {
		throw new Error('HAtooooooooooo!')
	}
}
