import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/common/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                'base-black': '-2px 2px 10px 2px #00000080',
            },
            colors: {
                'base-red': '#ee1515',
                'base-red-dark': '#930d0f',
                'base-white': '#f0f0f0',
                'base-white-soft': '#d9d9d9',
                'base-white-dark': '#a3a3a3',
            },
            fontFamily: {
                'default': ['Tektur'],
                'vcr-mono': ['vcr-mono'],
            },
            transitionProperty: {
                'height': 'height',
                'width': 'width',
                'max-height': 'max-height',
            },
            transitionDuration: {
                '400': '400ms',
                '800': '800ms',
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            transform: ['active', 'hover', 'focus'],
        }
    },
    plugins: [],
}
export default config
