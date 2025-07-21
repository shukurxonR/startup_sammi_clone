'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'

export default function ModeToggle() {
	const { setTheme, resolvedTheme } = useTheme()

	const isDark = resolvedTheme === 'dark'

	return (
		<Button
			variant='ghost'
			size={'sm'}
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className='md:h-11 md:w-11 py-2 rounded-sm px-3 text-xs '
		>
			{isDark ? <Sun className='!w-5 !h-5' /> : <Moon className='!w-5 !h-5' />}
		</Button>
	)
}
