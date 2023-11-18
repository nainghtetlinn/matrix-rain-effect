# Matrix Rain Effect

## Usage/Examples

```javascript
import { animateMatrixEffect } from "library"

window.addEventListener("load", function () {
  animateMatrixEffect(
    "canvas-container",
    {
      fontSize: 30,
      color: "rgba(255,255,255,1)",
      firstWordColor: "rgba(255,0,0,1)",
      bgColor: "rgba(0,0,0,1)",
      bgFade: "rgba(0,0,0,0.3)",
    },
    () => console.log("animation active")
  )
})
```
