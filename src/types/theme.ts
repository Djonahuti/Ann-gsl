type WithOpacity<T> = T | ((params: { opacityValue: number | undefined }) => T)

export type ThemeColors = {
  primary: WithOpacity<string>
  'primary-light': WithOpacity<string>
  'primary-dark': WithOpacity<string>
}
