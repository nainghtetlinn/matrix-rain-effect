export type OtherPropsType =
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
  firstWordColor: string
  bgColor: string
  bgFade: string
}
