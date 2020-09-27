const STEPS = document.getElementsByClassName('step')

let currentStep

selectStep("firstStep")

function selectStep(id) {
  currentStep = document.getElementById(id)

  for (let item of STEPS) {
    item.style = "display: none;"
  }

  currentStep.style = "display: flex;"
}