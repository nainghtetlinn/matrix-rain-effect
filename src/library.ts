import Color from "color"
import { OtherPropsType, OptionsType, AppOptionsType } from "./types"

const defaultOptions = {
  fontSize: 30,
  color: "rgba(255, 255, 255, 1)",
  bgColor: "rgba(0, 0, 0, 1)",
}

export function animateMatrixEffect(id: string, ...rest: OtherPropsType) {
  const parentElement = document.getElementById(id)
  if (!parentElement) throw new Error(`Cannot find element with id: "${id}"`)

  // creating canvas and append into parent element
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")!
  parentElement.innerHTML = ""
  parentElement.appendChild(canvas)

  // getting options base on user parameter
  let options: OptionsType = {}
  if (rest.length > 0) {
    if (typeof rest[0] === "function") {
      rest[0]()
    } else {
      options = { ...rest[0] }
    }

    rest[1] && typeof rest[1] === "function" && rest[1]()
  }

  const appOptions: AppOptionsType = {
    fontSize: options.fontSize || defaultOptions.fontSize,
    color: new Color(options.color || defaultOptions.color).rgb().string(),
    bgColor: new Color(options.bgColor || defaultOptions.bgColor)
      .rgb()
      .string(),
    bgFade: new Color(options.bgColor || defaultOptions.bgColor)
      .alpha(0.2)
      .rgb()
      .string(),
    firstWordColor: new Color(
      options.firstWordColor || options.color || defaultOptions.color
    )
      .rgb()
      .string(),
  }

  let effect = new MatrixEffect(canvas.width, canvas.height, appOptions)

  new ResizeObserver(e => {
    const parent = e[0].target
    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight

    // setting background
    context.fillStyle = appOptions.bgColor
    context.fillRect(0, 0, canvas.width, canvas.height)
    // setting color, font and text align
    context.fillStyle = appOptions.color
    context.font = appOptions.fontSize + "px monospace"
    context.textAlign = "center"

    effect = new MatrixEffect(canvas.width, canvas.height, appOptions)
  }).observe(parentElement)

  function animate(timeStamp: number) {
    context.fillStyle = appOptions.bgFade
    context.fillRect(0, 0, canvas.width, canvas.height)

    effect.render(context, timeStamp)

    window.requestAnimationFrame(animate)
  }
  animate(0)
}

class MatrixEffect {
  private width
  private height
  private options
  private streams: Stream[]

  constructor(width: number, height: number, options: AppOptionsType) {
    this.width = width
    this.height = height
    this.options = options
    this.streams = []
    this.generateStreams()
  }

  private generateStreams() {
    let x = 0
    for (let i = 0; i < this.width / this.options.fontSize; i++) {
      this.streams[i] = new Stream(x, this.options)
      x += this.options.fontSize
    }
  }

  render(ctx: CanvasRenderingContext2D, timeStamp: number) {
    this.streams.forEach(stream => {
      // looping each columns
      stream.symbols.forEach((symbol, i) => {
        // looping each rows
        if (i == 0 && symbol.first) {
          ctx.fillStyle = this.options.firstWordColor
        } else {
          ctx.fillStyle = this.options.color
        }
        ctx.fillText(symbol.value, symbol.x, symbol.y)
        symbol.rain(this.height, stream.speed)
        symbol.setValue(timeStamp)
      })
    })
  }
}

class Stream {
  private x
  private options
  symbols: Symbol[]
  speed

  constructor(x: number, options: AppOptionsType) {
    this.x = x
    this.options = options
    this.symbols = []
    this.speed = random(1, 3)
    this.generateSymbols()
  }

  private generateSymbols() {
    let y = random(-500, 0)
    let totalSymbols = random(5, 30)

    for (let i = 0; i < totalSymbols; i++) {
      this.symbols[i] = new Symbol(this.x, y)
      y -= this.options.fontSize
    }
  }
}

class Symbol {
  x
  y
  first
  value = ""
  private lastTime
  private switchInterval

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.first = random(0, 1) === 1
    this.setValue(0)
    this.lastTime = 0
    this.switchInterval = random(500, 1500) // in milliseconds
  }

  rain(height: number, speed: number) {
    if (this.y >= height) {
      this.y = 0
      this.first = random(0, 1) === 1
    } else {
      this.y += speed
    }
  }

  setValue(timeInMillisecond: number) {
    if (
      timeInMillisecond - this.lastTime >= this.switchInterval ||
      timeInMillisecond === 0
    ) {
      this.value = chars.charAt(Math.floor(Math.random() * chars.length))
      this.lastTime = timeInMillisecond
    }
  }
}

var chars =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
