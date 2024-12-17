/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/pokemon',
    output: 'export',
    images: {
        minimumCacheTTL: 300,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/PokeAPI/**',
            },
        ],
        unoptimized: true
    }
}

module.exports = nextConfig
