import type { Config } from 'tailwindcss'
import type { ThemeColors } from './src/types/theme'

type ColorValueFunction = (params: { opacityValue: number | undefined }) => string

const withOpacityValue = (variable: string): ColorValueFunction => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(--color-${variable}))`
    }
    return `hsl(var(--color-${variable}) / ${opacityValue})`
  }
}

const config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--primary'),
        'primary-light': withOpacityValue('--primary-light'),
        'primary-dark': withOpacityValue('--primary-dark')
      } satisfies Partial<ThemeColors>
    }
  },
  plugins: []
} satisfies Config

export default config