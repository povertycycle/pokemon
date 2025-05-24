module.exports = {
    experimental: {
        optimizeUniversalDefaults: true,
    },
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/common/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "480px",
            },
            borderRadius: {
                semi: "4px",
            },
            backgroundImage: {
                "gradient-radial":
                    "radial-gradient(circle at center, var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            boxShadow: {
                "base-black": "-2px 2px 10px 2px #00000080",
            },
            colors: {
                "base-red-0": "#fcd9d9",
                "base-red-1": "#f9b3b3",
                "base-red-2": "#f68d8d",
                "base-red-3": "#f46767",
                "base-red-4": "#f14141",
                "base-red-5": "#ee1515",
                "base-red-6": "#d11010",
                "base-red-7": "#ab0d0d",
                "base-red-8": "#850a0a",
                "base-red-9": "#5f0707",
                "base-red-10": "#390404",
                "base-white": "#f0f0f0",
            },
            dropShadow: {
                "text-mobile": "0 0 1px black",
                "text-desktop": "0 0 2px black",
            },
            fontSize: {
                xxs: "10px",
            },
            fontFamily: {
                default: ["Tektur"],
                "vcr-mono": ["vcr-mono"],
            },
            transitionProperty: {
                height: "height",
                width: "width",
                "max-height": "max-height",
                "max-width": "max-width",
                filter: "filter",
            },
            transitionDuration: {
                "400": "400ms",
                "800": "800ms",
            },
            maxWidth: {
                box: "400px",
            },
            width: {
                box: "400px",
            },
            zIndex: {
                "1": "1",
                "2": "2",
                max: "1000",
            },
            variants: {
                height: ["responsive", "hover", "focus"],
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
            transform: ["active", "hover", "focus"],
        },
    },
    plugins: [],
};
