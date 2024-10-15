export const calcPerc = function (value) {
    if (value <= 0) {
        value = 0
    } else if (value >= 100) {
        value = 100
    }
    return value * 9 / 10
}

export const mars_image = `
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 100 100">
    <!-- Rettangolo blu per il riempimento
    Minimo: width=0px
    Massimo: width=90px 
    -->
    <rect id="mars_perc" fill="#199BFC" height="95" y="4" x="5"></rect>

    <!-- Definizione della maschera per il simbolo maschile -->
    <mask id="mask_mars">
        <!-- Rettangolo nero per definire la parte da mantenere visibile -->
        <rect fill="white" height="100" width="100"></rect>
        <!-- Disegno del simbolo maschile -->
        <path transform="scale(6.2)"
            d="M11.307.666V2h1.75l-2.649 2.65a5.967 5.967 0 0 0-3.742-1.316c-3.304 0-6 2.696-6 6s2.696 6 6 6 6-2.696 6-6a5.967 5.967 0 0 0-1.316-3.742L14 2.943v1.75h1.334V.666h-4.027zm-4.641 4a4.663 4.663 0 0 1 4.668 4.668A4.662 4.662 0 0 1 6.666 14 4.66 4.66 0 0 1 2 9.334a4.662 4.662 0 0 1 4.666-4.668z"
            style="color: white;fill: black;stroke-width:.333;stroke:#000;stroke-opacity:1;fill-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;"></path>
    </mask>

    <!-- Applicazione della maschera al rettangolo blu -->
    <rect width="100" height="100" fill="blue" mask="url(#mask_mars)" style="fill: white;"></rect>
    <path transform="scale(6.2)"
        d="M11.307.666V2h1.75l-2.649 2.65a5.967 5.967 0 0 0-3.742-1.316c-3.304 0-6 2.696-6 6s2.696 6 6 6 6-2.696 6-6a5.967 5.967 0 0 0-1.316-3.742L14 2.943v1.75h1.334V.666h-4.027zm-4.641 4a4.663 4.663 0 0 1 4.668 4.668A4.662 4.662 0 0 1 6.666 14 4.66 4.66 0 0 1 2 9.334a4.662 4.662 0 0 1 4.666-4.668z"
        style="color: #000;fill: transparent;stroke-width:.333;stroke:#000;stroke-opacity:1;fill-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;"></path>
</svg>`