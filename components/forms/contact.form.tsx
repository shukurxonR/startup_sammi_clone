'use client'
import useTranslate from '@/hooks/use-lng'
import { ContactSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

function ContactForm() {
	const [isLoading, setIsLoading] = useState(false)
	const t = useTranslate()

	const form = useForm<z.infer<typeof ContactSchema>>({
		resolver: zodResolver(ContactSchema),
		defaultValues: {
			email: '',
			message: '',
			name: '',
		},
	})

	function onSubmit(values: z.infer<typeof ContactSchema>) {
		setIsLoading(true)
		const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_API!
		const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID!

		const promise = fetch(
			`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
				},
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: `Name: ${values.name}:
Email: ${values.email}:
Message: ${values.message}`,
				}),
			}
		)
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									disabled={isLoading}
									className='h-32 resize-none'
									placeholder={t('contactFormTextarea')}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder={t('contactFormEmail')}
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder={t('contactFormName')}
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='w-fit'
					size={'lg'}
					type='submit'
					disabled={isLoading}
					round={'full'}
				>
					<span>{t('send')}</span>
					<Send className='ml-2 size-4' />
				</Button>
			</form>
		</Form>
	)
}

export default ContactForm
