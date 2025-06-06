/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/pokemon',
    // assetPrefix: '/pokemon/',
    output: 'export',
    images: {
        minimumCacheTTL: 3000,
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
