/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// Edge Runtime da Node.js API-dan foydalanishni ruxsat berish
		allowMiddlewareResponseBody: true,
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '*' },
			{ protocol: 'http', hostname: '*' },
		],
	},
}

export default nextConfig
