'use client'

import Logo from '@/components/shared/logo'
import { Separator } from '@/components/ui/separator'
import { navLinks } from '@/constants/const'
import useTranslate from '@/hooks/use-lng'
import { Layers2, Mail, MapPin, PhoneCall, PhoneCallIcon } from 'lucide-react'
import Link from 'next/link'

function Footer() {
	const t = useTranslate()

	return (
		<div className='mt-12 bg-secondary/50 pt-12 px-4'>
			<div className='container mx-auto max-w-7xl pb-12'>
				<div className='grid grid-cols-1 gap-12 md:grid-cols-4'>
					<div className='flex flex-col space-y-3 md:col-span-2'>
						<Logo />
						<p>{t('heroDescription')}</p>
					</div>

					<div className='flex flex-col space-y-3'>
						<h1 className='font-space-grotesk flex items-center gap-2 text-3xl'>
							{t('pages')} <Layers2 />
						</h1>
						<div className='flex flex-col space-y-3 pt-6'>
							{navLinks.map(item => (
								<Link
									key={item.route}
									href={`/${item.route}`}
									className='font-medium transition-all hover:text-blue-500 hover:underline'
								>
									{t(item.name)}
								</Link>
							))}
						</div>
					</div>

					<div className='flex flex-col space-y-3'>
						<h1 className='font-space-grotesk flex items-center gap-2 text-3xl'>
							{t('contacts')} <PhoneCallIcon />
						</h1>
						<div className='flex flex-col space-y-3 pt-6'>
							<div className='flex items-center space-x-3'>
								<PhoneCall size={20} />
								<div className='flex flex-col space-y-1'>
									<a
										className='text-sm hover:text-blue-500 hover:underline dark:hover:text-blue-300'
										href='tel:+998900000000'
									>
										+998 (90) 000-00-00
									</a>
									<Separator className='dark:bg-gray-500' />
									<a
										className='text-sm hover:text-blue-500 hover:underline dark:hover:text-blue-300'
										href='tel:+31220777777'
									>
										+31 220 777 777
									</a>
								</div>
							</div>

							<div className='flex items-center space-x-3'>
								<Mail size={20} />
								<a
									className='text-sm hover:text-blue-500 hover:underline dark:hover:text-blue-300'
									href='mailto:info@sammi.ac'
								>
									info@sammi.ac
								</a>
							</div>

							<div className='flex items-center space-x-3'>
								<MapPin size={20} />
								<span className='text-sm'>
									Ronda de Elburg 30008 Geleen Niderlandia
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='pt-12'>
					<Separator className='mb-3 dark:bg-gray-500' />
					<p>
						© {new Date().getFullYear()}. {t('copyright')}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
