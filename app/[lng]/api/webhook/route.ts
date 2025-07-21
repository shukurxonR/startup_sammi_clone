// import { createUser, updateUser } from '@/actions/user.action'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { headers } from 'next/headers'
// import { NextResponse } from 'next/server'
// import { Webhook } from 'svix'

// export async function POST(req: Request) {
// 	const WEBHOOK_SECRET = process.env.NEXT_WEBHOOK_CLERK_SECRET
// 	if (!WEBHOOK_SECRET) {
// 		throw new Error('Iltimos env ga Webhook manzilni qo`shing')
// 	}

// 	const headerPayload = headers()
// 	const svixId = headerPayload.get('svix-id')
// 	const svixTimestamp = headerPayload.get('svix-timestamp')
// 	const svixSignature = headerPayload.get('svix-signature')

// 	if (!svixId || !svixTimestamp || !svixSignature) {
// 		return new Response('Error occurred -- no svix headers', {
// 			status: 400,
// 		})
// 	}
// 	const payload = await req.json()
// 	const body = JSON.stringify(payload)
// 	const wh = new Webhook(WEBHOOK_SECRET)

// 	let evt: WebhookEvent

// 	try {
// 		evt = wh.verify(body, {
// 			'svix-id': svixId,
// 			'svix-timestamp': svixTimestamp,
// 			'svix-signature': svixSignature,
// 		}) as WebhookEvent
// 	} catch (err) {
// 		console.error('Error verifying webhook:', err)
// 		return new Response('Error occurred', {
// 			status: 400,
// 		})
// 	}
// 	const eventType = evt.type

// 	if (eventType === 'user.created') {
// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 		const { id, email_addresses, image_url, first_name, last_name } = evt.data

// 		const user = await createUser({
// 			clerkId: id,
// 			email: email_addresses[0].email_address,
// 			fullName: `${first_name} ${last_name}`,
// 			picture: image_url,
// 		})
// 		return NextResponse.json({ message: 'OK', user })
// 	}
// 	if (eventType === 'user.updated') {
// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 		const { id, email_addresses, image_url, first_name, last_name } = evt.data

// 		const user = await updateUser({
// 			clerkId: id,
// 			updatedData: {
// 				email: email_addresses[0].email_address,
// 				fullName: `${first_name} ${last_name}`,
// 				picture: image_url,
// 			},
// 		})
// 		return NextResponse.json({ message: 'OK', user })
// 	}
// }

import { createUser, updateUser } from '@/actions/user.action'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.NEXT_WEBHOOK_CLERK_SECRET

	if (!WEBHOOK_SECRET) {
		throw new Error(
			'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
		)
	}

	const headerPayload = headers()
	const svixId = headerPayload.get('svix-id')
	const svixTimestamp = headerPayload.get('svix-timestamp')
	const svixSignature = headerPayload.get('svix-signature')

	if (!svixId || !svixTimestamp || !svixSignature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		})
	}

	const payload = await req.json()
	const body = JSON.stringify(payload)

	const wh = new Webhook(WEBHOOK_SECRET)

	let evt: WebhookEvent

	try {
		evt = wh.verify(body, {
			'svix-id': svixId,
			'svix-timestamp': svixTimestamp,
			'svix-signature': svixSignature,
		}) as WebhookEvent
	} catch (err) {
		console.error('Error verifying webhook:', err)
		return new Response('Error occured', {
			status: 400,
		})
	}

	const eventType = evt.type

	if (eventType === 'user.created') {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, email_addresses, image_url, first_name, last_name } = evt.data

		const user = await createUser({
			clerkId: id,
			email: email_addresses[0].email_address,
			fullName: `${first_name} ${last_name}`,
			picture: image_url,
		})

		return NextResponse.json({ message: 'OK', user })
	}

	if (eventType === 'user.updated') {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, email_addresses, image_url, first_name, last_name } = evt.data

		const user = await updateUser({
			clerkId: id,
			updatedData: {
				email: email_addresses[0].email_address,
				fullName: `${first_name} ${last_name}`,
				picture: image_url,
			},
		})

		return NextResponse.json({ message: 'OK', user })
	}
}
