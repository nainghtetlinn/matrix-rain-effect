export type OtherProps =
  | [OptionsType]
  | [OptionsType, () => void]
  | [() => void]
  | []

interface OptionsType {
  fontSize?: number
  color?: string
  firstWordColor?: string
  bgColor?: string
  bgFade?: string
}

export interface DefaultOptionsType {
  fontSize: number
  color: string
  bgColor: string
  bgFade: string
  firstWordColor?: string
}
