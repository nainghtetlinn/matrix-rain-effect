import { OtherProps, DefaultOptionsType } from "./types"

export function animateMatrixEffect(id: string, ...otherProps: OtherProps) {
  const parentElement = document.getElementById(id)
  if (!parentElement) throw new Error(`Cannot find element with id: "${id}"`)

  // creating canvas and append into parent element
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")!
  parentElement.innerHTML = ""
  parentElement.appendChild(canvas)

  let options: DefaultOptionsType = {
    fontSize: 20,
    bgColor: "rgba(0, 0, 0, 1)",
    bgFade: "rgba(0, 0, 0, 0.3)",
    color: "rgba(255, 255, 255, 1)",
  }

  if (otherProps.length > 0) {
    typeof otherProps[0] === "function"
      ? otherProps[0]()
      : (options = { ...options, ...otherProps[0] })

    otherProps[1] && typeof otherProps[1] === "function" && otherProps[1]()
  }

  let effect = new MatrixEffect(canvas.width, canvas.height, options)
  let frameCount = 0

  new ResizeObserver(e => {
    const parent = e[0].target
    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight

    // setting background
    context.fillStyle = options.bgColor
    context.fillRect(0, 0, canvas.width, canvas.height)
    // setting color, font and text align
    context.fillStyle = options.color
    context.font = options.fontSize + "px monospace"
    context.textAlign = "center"

    effect = new MatrixEffect(canvas.width, canvas.height, options)
  }).observe(parentElement)

  function animate() {
    context.fillStyle = options.bgFade
    context.fillRect(0, 0, canvas.width, canvas.height)

    effect.render(context, frameCount)
    frameCount++
    window.requestAnimationFrame(animate)
  }
  animate()
}

class MatrixEffect {
  private width
  private height
  private options
  private streams: Stream[]

  constructor(width: number, height: number, options: DefaultOptionsType) {
    this.width = width
    this.height = height
    this.options = options
    this.streams = []
    this.generateStreams()
  }

  private generateStreams() {
    let x = 0
    for (let i = 0; i < this.width / this.options.fontSize; i++) {
      this.streams[i] = new Stream(x, this.options.fontSize)
      x += this.options.fontSize
    }
  }

  render(ctx: CanvasRenderingContext2D, frameCount: number) {
    this.streams.forEach(stream => {
      // looping each columns
      stream.symbols.forEach((symbol, i) => {
        // looping each rows
        if (i == 0 && symbol.first) {
          ctx.fillStyle = this.options.firstWordColor || this.options.color
        } else {
          ctx.fillStyle = this.options.color
        }
        ctx.fillText(symbol.value, symbol.x, symbol.y)
        symbol.rain(this.height, stream.speed)
        symbol.setValue(frameCount)
      })
    })
  }
}

class Stream {
  private x
  private fontSize
  symbols: Symbol[]
  speed

  constructor(x: number, fontSize: number) {
    this.x = x
    this.fontSize = fontSize
    this.symbols = []
    this.speed = random(1, 5)
    this.generateSymbols()
  }

  private generateSymbols() {
    let y = random(-500, 0)
    let totalSymbols = random(5, 30)

    for (let i = 0; i < totalSymbols; i++) {
      this.symbols[i] = new Symbol(this.x, y)
      y -= this.fontSize
    }
  }
}

class Symbol {
  value = ""
  x
  y
  first
  private switchInterval

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.setValue(0)
    this.first = random(0, 1) === 1
    this.switchInterval = random(30, 50)
  }

  rain(height: number, speed: number) {
    if (this.y >= height) {
      this.y = 0
    } else {
      this.y += speed
    }
  }

  setValue(frameCount: number) {
    if (frameCount % this.switchInterval === 0 || frameCount === 0) {
      this.value = chars.charAt(Math.floor(Math.random() * chars.length))
    }
  }
}

var chars =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
