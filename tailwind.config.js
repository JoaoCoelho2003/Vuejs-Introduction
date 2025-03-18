import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '*.{js,ts,jsx,tsx,mdx}']
export const darkMode = 'class'
export const plugins = [typography, animate]
