// @ts-nocheck
import Color from "color"
import { animateMatrixEffect } from "./library"

let isEditing = true
const btnEl = document.getElementById("btn")
const formEl = document.getElementById("form")
const closeEl = document.getElementById("close")
btnEl?.addEventListener("click", () => {
  isEditing = true
  updateScreen()
})
closeEl?.addEventListener("click", () => {
  isEditing = false
  updateScreen()
})
formEl?.addEventListener("submit", e => {
  e.preventDefault()
  updateCanvas()
})

const values = {
  fontSize: 30,
  color: new Color("white").hex(),
  firstWordColor: new Color("red").hex(),
  bgColor: new Color("black").hex(),
  wordCounts: { min: 5, max: 15 },
  rainSpeed: { min: 1, max: 5 },
  switchInterval: { min: 500, max: 1500 },
}

window.addEventListener("load", function () {
  formEl.textColor.value = values.color
  formEl.textColorText.value = values.color
  formEl.firstWordColor.value = values.firstWordColor
  formEl.firstWordColorText.value = values.firstWordColor
  formEl.bgColor.value = values.bgColor
  formEl.bgColorText.value = values.bgColor
  formEl.fontSize.value = values.fontSize
  formEl.wcMin.value = values.wordCounts.min
  formEl.wcMax.value = values.wordCounts.max
  formEl.rsMin.value = values.rainSpeed.min
  formEl.rsMax.value = values.rainSpeed.max
  formEl.siMin.value = values.switchInterval.min
  formEl.siMax.value = values.switchInterval.max

  animateMatrixEffect("canvas-container", values)
})

// text color
formEl.textColor.addEventListener("change", e => {
  formEl.textColorText.value = e.target.value
  updateCanvas()
})
formEl.textColorText.addEventListener("input", e => {
  formEl.textColor.value = e.target.value
})
formEl.textColorText.addEventListener("change", e => {
  formEl.textColor.value = e.target.value
})
// first word color
formEl.firstWordColor.addEventListener("change", e => {
  formEl.firstWordColorText.value = e.target.value
  updateCanvas()
})
formEl.firstWordColorText.addEventListener("input", e => {
  formEl.firstWordColor.value = e.target.value
})
formEl.firstWordColorText.addEventListener("change", e => {
  formEl.firstWordColor.value = e.target.value
})
// background color
formEl.bgColor.addEventListener("change", e => {
  formEl.bgColorText.value = e.target.value
  updateCanvas()
})
formEl.bgColorText.addEventListener("input", e => {
  formEl.bgColor.value = e.target.value
})
formEl.bgColorText.addEventListener("change", e => {
  formEl.bgColor.value = e.target.value
})

function updateCanvas() {
  const newValues = {
    fontSize: +formEl.fontSize.value,
    color: formEl.textColor.value,
    firstWordColor: formEl.firstWordColor.value,
    bgColor: formEl.bgColor.value,
    wordCounts: { min: +formEl.wcMin.value, max: +formEl.wcMax.value },
    rainSpeed: { min: +formEl.rsMin.value, max: +formEl.rsMax.value },
    switchInterval: { min: +formEl.siMin.value, max: +formEl.siMax.value },
  }
  animateMatrixEffect("canvas-container", newValues)
}

function updateScreen() {
  if (isEditing) {
    formEl?.classList.remove("hidden")
    btnEl?.classList.add("hidden")
  } else {
    formEl?.classList.add("hidden")
    btnEl?.classList.remove("hidden")
  }
}

updateScreen()
