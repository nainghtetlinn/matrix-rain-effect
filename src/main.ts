import { animateMatrixEffect } from "./library"

window.addEventListener("load", function () {
  animateMatrixEffect("canvas-container", {
    fontSize: 30,
    color: "rgba(255,255,255,1)",
    firstWordColor: "red",
    wordCounts: { min: 8, max: 20 },
  })
})
