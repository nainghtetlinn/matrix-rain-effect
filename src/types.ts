export type OtherProps =
  | [OptionsType]
  | [OptionsType, () => void]
  | [() => void]
  | []

export type OptionsType = {
  fontSize?: number
  color?: string
  firstWordColor?: string
  bgColor?: string
}

export type AppOptionsType = {
  fontSize: number
  color: string
  bgColor: string
  bgFade: string
  firstWordColor: string
}

export const defaultOptions = {
  fontSize: 30,
  color: "rgba(255, 255, 255, 1)",
  bgColor: "rgba(0, 0, 0, 1)",
}
