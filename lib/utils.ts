import { enUS, ruRU, trTR } from '@clerk/localizations'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { uzUZ } from './uz-UZ'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function localization(lng: string) {
	if (lng === 'en') return enUS
	if (lng === 'ru') return ruRU
	if (lng === 'tr') return trTR
	if (lng === 'uz') return uzUZ
}
export function getCurrentLng(lng: string) {
	if (lng === 'en') return 'English'
	if (lng === 'ru') return "Русский"
	if (lng === 'tr') return 'Türkçe'
	if (lng === 'uz') return 'Ozbekcha'
}
