// import { WebhookEvent } from '@clerk/nextjs/server'
// import { headers } from 'next/headers'
// import { Webhook } from './../../../../node_modules/svix/src/webhook'

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
// 		const { id, image_url, email_addresses, first_name, last_name } = evt.data
// 	}
// }
