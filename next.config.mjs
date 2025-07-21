/** @type {import('next').NextConfig} */
const nextConfig = {
	// images: {
	// 	// domains: [
	// 	// 	'sammi.ac',
	// 	// 	'www.sammi.ac', // 👉 buni alohida qo‘shing
	// 	// 	'utfs.io',
	// 	// 	'qk9g5hsrut.ufs.sh',
	// 	// ],

	// },
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '*' },
			{ protocol: 'http', hostname: '*' },
		],
	},
}

export default nextConfig
