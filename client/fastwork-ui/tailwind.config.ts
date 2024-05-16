import type { Config } from "tailwindcss";
import type { Config as DaisyuiConfig} from 'daisyui'

const daisyui: DaisyuiConfig = {
  base: false,
  themes: [
    {
      laconic: {
        primary: '#83CCFF',
        secondary: '#E8E8E8',
        accent: '#c1cef9',
        neutral: '#070403',
        'base-100': '#FFFFFF',
        success: '#00823D',
        warning: '#F07129',
        error: '#EB2121',
        // background: 'linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%)'
      }
    }
  ]
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui
};


export default config;
