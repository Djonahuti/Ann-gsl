import type { Config } from 'tailwindcss'

type WithOpacity<T> = T | ((params: { opacityValue: number | undefined }) => T)

export type ThemeColors = {
  primary: WithOpacity<string>
  'primary-light': WithOpacity<string>
  'primary-dark': WithOpacity<string>
}

declare module 'tailwindcss' {
  interface CorePlugins {
    preflight: false
  }
}