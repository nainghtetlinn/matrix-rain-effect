import Color from "color"
import { OptionsType, AppOptionsType } from "./types"

const defaultOptions = {
  fontSize: 30,
  color: "rgba(255, 255, 255, 1)",
  bgColor: "rgba(0, 0, 0, 1)",
  wordCounts: { min: 5, max: 20 },
  rainSpeed: { min: 1, max: 3 },
  switchInterval: { min: 500, max: 1500 },
}

export function createAppOptions(options: OptionsType): AppOptionsType {
  return {
    fontSize: options.fontSize || defaultOptions.fontSize,
    color: new Color(options.color || defaultOptions.color).rgb().string(),
    bgColor: new Color(options.bgColor || defaultOptions.bgColor)
      .rgb()
      .string(),
    bgFade: new Color(options.bgColor || defaultOptions.bgColor)
      .alpha(options.fade || 0.2)
      .rgb()
      .string(),
    firstWordColor: new Color(
      options.firstWordColor || options.color || defaultOptions.color
    )
      .rgb()
      .string(),
    wordCounts: options.wordCounts || defaultOptions.wordCounts,
    rainSpeed: options.rainSpeed || defaultOptions.rainSpeed,
    switchInterval: options.switchInterval || defaultOptions.switchInterval,
  }
}
