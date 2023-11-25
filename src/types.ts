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
  wordCounts?: { min: number; max: number }
  rainSpeed?: { min: number; max: number }
  switchInterval?: { min: number; max: number }
}

export type AppOptionsType = {
  fontSize: number
  color: string
  firstWordColor: string
  bgColor: string
  bgFade: string
  wordCounts: { min: number; max: number }
  rainSpeed: { min: number; max: number }
  switchInterval: { min: number; max: number }
}
