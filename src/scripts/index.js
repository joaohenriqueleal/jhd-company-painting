"use strict"


const cardServices = [...document.getElementsByClassName('card-service')]


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
