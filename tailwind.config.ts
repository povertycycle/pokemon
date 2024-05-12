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
            colors: {
                'base-red': '#ee1515',
                'base-red-dark': '#a10e0e',
                'base-white': '#f0f0f0',
                'base-white-soft': '#d9d9d9',
                'base-white-dark': '#a3a3a3',
                'hp-dark': '#A60000',
                'atk-dark': '#9C531F',
                'def-dark': '#A1871F',
                'sp-atk-dark': '#445E9C',
                'sp-def-dark': '#4E8234',
                'spd-dark': '#A13959',
                'x-dark': '#4b0478',
                'y-dark': '#04818a',
            },
            fontFamily: {
                'default': 'vcr-mono'
            },
            transitionProperty: {
                'height': 'height',
                'width': 'width',
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
