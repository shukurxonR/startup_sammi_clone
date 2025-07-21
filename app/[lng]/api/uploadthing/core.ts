import { currentUser } from '@clerk/nextjs'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
	imageUploader: f({
		image: {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async () => {
			const user = await currentUser()

			if (!user) throw new UploadThingError('Unauthorized')

			return { userId: user.id }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.userId)

			console.log('file url', file.ufsUrl)

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
