# Matrix Rain Effect

A lightweight javascript library for matrix rain effect.

## Demo

https://matrix-rain-effect.netlify.app

## Usage/Examples

Html

```html
<div id="canvas-container" class="container"></div>
```

Css

```css
.container {
  overflow: hidden;
  position: fixed;
  inset: 0;
}
```

Javascript

```javascript
import { animateMatrixEffect } from "./library"

window.addEventListener("load", function () {
  animateMatrixEffect("canvas-container", {
    fontSize: 30,
    color: "#ffffff",
    firstWordColor: "#ff0000",
    bgColor: "#000000",
    wordCounts: { min: 5, max: 15 },
    rainSpeed: { min: 1, max: 5 },
    switchInterval: { min: 500, max: 1500 }, // milliseconds
  }),
  () => {
    console.log("Animation started")
  }
}
```

The `animateMatrixEffect` function will accept `id` of the container element.

You can customize the appearance by giving the `options` object as second parameter.

You can also pass `callback` function as second perameter or thrid parameter.

```javascript
animateMatrixEffect("canvas-container")
animateMatrixEffect("canvas-container", options)
animateMatrixEffect("canvas-container", options, callback)
animateMatrixEffect("canvas-container", callback)
```
