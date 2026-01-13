"use strict"


import formatPrice from "./formatPrice.js"

const cardServices = [...document.getElementsByClassName('card-service')]
const calculatorResult = document.getElementById('calculator-result')
const btnComputePrice = document.getElementById('btnComputePrice')
const boxesWithWasher = document.getElementById('boxesWithWasher')
const boxesMailWater = document.getElementById('boxesMailWater')
const boxesNoWasher = document.getElementById('boxesNoWasher')

const valuePerMailOrWaterBox = 10
const valuePerBoxWithWasher = 35
const valuePerBoxNoWasher = 30

btnComputePrice.addEventListener('click', () => {
    let serviceValue = 0

    serviceValue += Number(boxesMailWater.value) * valuePerMailOrWaterBox
    serviceValue += Number(boxesWithWasher.value) * valuePerBoxWithWasher
    serviceValue +=  Number(boxesNoWasher.value) * valuePerBoxNoWasher

    calculatorResult.innerHTML = formatPrice(serviceValue)
})

function closeOverlay(overlay) {
    overlay.classList.remove('active')

    overlay.addEventListener(
        'transitionend',
        () => {
            overlay.remove()
        },
        { once: true }
    )
}

cardServices.forEach((cs) => {
    cs.addEventListener('click', () => {
        const overlay = document.createElement('div')
        overlay.classList.add('overlay')
        overlay.addEventListener('click', () => {
            closeOverlay(overlay)
        })

        const overlayContent = document.createElement('div')
        overlayContent.classList.add('overlay-content')
        overlay.appendChild(overlayContent)
        overlayContent.addEventListener('click', (e) => {
            e.stopPropagation()
        })

        const titleOverlayContent = document.createElement('div')
        titleOverlayContent.classList.add('title-overlay-content')
        overlayContent.appendChild(titleOverlayContent)

        const title = document.createElement('h2')
        title.innerHTML = 'detalhes'
        title.classList.add('title-overlay')
        titleOverlayContent.appendChild(title)

        const closeOverlayButton = document.createElement('button')
        closeOverlayButton.addEventListener('click', () => {
            closeOverlay(overlay)
        })
        closeOverlayButton.classList.add('close-overlay-button')
        closeOverlayButton.innerHTML = '⨯'
        titleOverlayContent.appendChild(closeOverlayButton)

        const imgService = cs.querySelector('img')
        const imgClone = imgService.cloneNode(true)
        overlayContent.appendChild(imgClone)
        document.body.appendChild(overlay)

        requestAnimationFrame(() => {
            overlay.classList.add('active')
        })
    })
})

const observer = new IntersectionObserver((entryes) => {
    entryes.map((entrye) => {
        if (entrye.isIntersecting) {
            entrye.target.classList.add('show')
        } else {
            entrye.target.classList.remove('show')
        }
    })
})

const hiddens = [...document.querySelectorAll('.hidden')]

hiddens.map((element) => observer.observe(element) )
