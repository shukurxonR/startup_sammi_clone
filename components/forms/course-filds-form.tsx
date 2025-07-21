'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { courseSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
// import { courseCategory, courseLanguage, courseLevels } from '@/constants'
import { createCourse } from '@/actions/course.action'
import { courseCategory, courseLanguage, courseLevels } from '@/constants/const'
import { UploadButton } from '@/lib/uploadthing'
import { ImageDown } from 'lucide-react'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

function CourseFieldsForm() {
	const [isloading, setIsloading] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [open, setOpen] = useState(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof courseSchema>>({
		resolver: zodResolver(courseSchema),
		defaultValues: defaultVal,
	})

	function onSubmit(values: z.infer<typeof courseSchema>) {
		console.log(previewImage)
		setIsloading(true)
		const { oldPrice, currentPrice } = values
		if (!previewImage) {
			return toast.error('Please upload a preview image')
		}
		const promise = createCourse({
			...values,
			oldPrice: +oldPrice,
			currentPrice: +currentPrice,
			previewImage,
		})
			.then(() => {
				form.reset()
				router.push('/en/instructor/my-courses')
			})
			.finally(() => setIsloading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfuliy created...',
			error: 'Somthing went wrong!',
		})
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Course title<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										placeholder='Learn ReactJS - from 0 to hero'
										disabled={isloading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Short description<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										className='h-44 bg-secondary'
										placeholder='Description'
										disabled={isloading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='learning'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										What will students learn in your course?
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											disabled={isloading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='requirements'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Requirements
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											disabled={isloading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='grid grid-cols-3 gap-4'>
						<FormField
							control={form.control}
							name='level'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Level<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
											disabled={isloading}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseLevels.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Category<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
											disabled={isloading}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseCategory.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='language'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Language<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
											disabled={isloading}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseLanguage.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='oldPrice'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Old price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className='bg-secondary'
											type='number'
											disabled={isloading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='currentPrice'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Old price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className='bg-secondary'
											type='number'
											disabled={isloading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem className='cursor-pointer'>
							<FormLabel>
								Preview image <span className='text-red-500'>*</span>
							</FormLabel>

							<UploadButton
								endpoint='imageUploader'
								config={{ appendOnPaste: true, mode: 'auto' }}
								onClientUploadComplete={res => {
									if (res && res[0] && res[0].ufsUrl) {
										setPreviewImage(res[0].ufsUrl)
									} else {
										toast.error('Image upload failed')
									}
								}}
							/>
						</FormItem>
					</div>

					<div className='flex justify-end gap-4'>
						<Button
							type='button'
							size={'lg'}
							variant={'destructive'}
							onClick={() => form.reset()}
							disabled={isloading}
						>
							Clear
						</Button>
						<Button type='submit' size={'lg'} disabled={isloading}>
							Submit
						</Button>
						{previewImage && (
							<Button
								type='button'
								size={'lg'}
								disabled={isloading}
								variant={'outline'}
								onClick={() => setOpen(true)}
							>
								<span>Image</span>
								<ImageDown className='ml-2 !size-4' />
							</Button>
						)}
					</div>
				</form>
			</Form>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='flex flex-col'>
					<div className='relative h-72 '>
						<Image
							src={previewImage}
							alt='preview-image'
							fill
							className='object-cover'
						/>
					</div>
					<Button
						className='w-fit self-end'
						variant={'destructive'}
						onClick={() => {
							setPreviewImage('')
							setOpen(false)
						}}
					>
						Remove
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default CourseFieldsForm

const defaultVal = {
	title: '',
	description: '',
	learning: '',
	requirements: '',
	level: '',
	category: '',
	language: '',
	oldPrice: '',
	currentPrice: '',
}
