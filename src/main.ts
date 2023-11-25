import { animateMatrixEffect } from "./library"

window.addEventListener("load", function () {
  animateMatrixEffect(
    "canvas-container",
    {
      fontSize: 30,
      color: "rgba(255,255,255,1)",
      firstWordColor: "red",
    },
    () => console.log("animation active")
  )
})
