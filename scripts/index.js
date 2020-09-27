new SmartPhoto(".js-smartphoto");

const $_STEPS = document.getElementsByClassName('step')
const $_RESULTS = document.getElementsByClassName('result')
const $_PASSPORT_EXPIRY_DATE = document.getElementById('passportExpiryDate')
const $_VISA_EXPIRY_DATE = document.getElementById('visaExpiryDate')
const MIN_DATE = new Date().toISOString().substring(0, 10);

let passportExpiryDate = null
let visaExpiryDate = null
let visaApplyDate = null
let visaApplyAltDate = null
let passportValidDate = null

$_PASSPORT_EXPIRY_DATE.setAttribute('min', MIN_DATE)
$_VISA_EXPIRY_DATE.setAttribute('min', MIN_DATE)

selectStep("firstStep")

function selectStep(id) {
  const $_CURRENT_STEP = document.getElementById(id)

  for (let item of $_STEPS) {
    item.style = "display: none;"
  }

  $_CURRENT_STEP.style = "display: flex;"

  window.scrollTo(0, 0);
}

function selectPassportExpiryDate(input) {
  passportExpiryDate = new Date(input.value)
}

function selectVisaExpiryDate(input) {
  visaExpiryDate = new Date(input.value)
}

function changeButtonState(input, id) {
  const $_BUTTON = document.getElementById(id)

  if (input.value) {
    $_BUTTON.disabled = false
  } else {
    $_BUTTON.disabled = true
  }
}

function calculateResults() {
  visaApplyDate = getVisaApplyDate()
  visaApplyAltDate = getVisaApplyAltDate()
  passportValidDate = getPassportValidDate(visaApplyDate)

  if (passportValidDate < passportExpiryDate) {
    const $_RESULT = document.getElementById('firstResult')
    const $_VISA_APPLY_DATE_RESULT = document.getElementById('visaApplyDateResult')

    $_VISA_APPLY_DATE_RESULT.innerHTML = formatDate(visaApplyDate)
    $_RESULT.style = "display: block;"
  } else {
    const $_RESULT = document.getElementById('secondResult')
    const $_VISA_EXPIRY_DATE_RESULT = document.getElementById('visaExpiryDateResult')
    const $_VISA_APPLY_ALT_DATE_RESULT = document.getElementById('visaApplyAltDateResult')

    $_VISA_EXPIRY_DATE_RESULT.innerHTML = formatDate(visaExpiryDate)
    $_VISA_APPLY_ALT_DATE_RESULT.innerHTML = formatDate(visaApplyAltDate)
    $_RESULT.style = "display: block;"
  }

  function getVisaApplyDate() {
    let value = new Date(visaExpiryDate)

    value.setMonth(value.getMonth() - 1)

    return value
  }

  function getVisaApplyAltDate() {
    let value = new Date(visaExpiryDate)

    value.setMonth(value.getMonth() - 2)

    return value
  }

  function getPassportValidDate(visaApplyDate) {
    let value = new Date(visaApplyDate)

    value.setMonth(value.getMonth() + 18)

    return value
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  }
}

function clearValues() {
  $_PASSPORT_EXPIRY_DATE.value = null
  $_VISA_EXPIRY_DATE.value = null

  for (let item of $_RESULTS) {
    item.style = "display: none;"
  }
}