'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { ICreateUser, IUpdateUser } from './types'

export const createUser = async (data: ICreateUser) => {
	try {
		await connectToDatabase()
		const { clerkId, email, fullName, picture } = data
		const isExist = await User.findOne({ clerkId })

		if (isExist) {
			const updatedUser = await User.findOneAndUpdate(
				{ email },
				{ fullName, picture, clerkId },
				{ new: true }
			)

			return updatedUser
		}

		const newUser = User.create(data)

		return newUser
	} catch {
		throw new Error('Error creating user. Please try again.')
	}
}

export const updateUser = async (data: IUpdateUser) => {
	try {
		await connectToDatabase()
		const { clerkId, updatedData } = data
		const updateduser = await User.findOneAndUpdate({ clerkId }, updatedData, {
			new: true,
		})
		return updateduser
	} catch {
		throw new Error('Error updating user. Please try again.')
	}
}
