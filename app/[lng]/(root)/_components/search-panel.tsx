import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

function SearchPanel() {
	return (
		<Button
			variant={'ghost'}
			className='md:h-11 md:w-11 py-2 rounded-sm px-3 text-xs'
		>
			<Search className='!w-5 !h-5' />
		</Button>
	)
}

export default SearchPanel
