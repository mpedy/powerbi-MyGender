export const calcPerc = function (value) {
    if (value <= 0) {
        value = 0
    } else if (value >= 100) {
        value = 100
    }
    return value * 85 / 100
}

export const venus_image = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 100 100">
    <!-- Rettangolo blu per il riempimento
     Minimo: width=0
     Massimo: width=85 -->
    <rect id="venus_perc" fill="pink" height="80" y="10" x="0" style="transform: translate(101px,5px) rotate(90deg);"></rect>

    <!-- Definizione della maschera per il simbolo maschile -->
    <mask id="mask_venus">
        <!-- Rettangolo nero per definire la parte da mantenere visibile -->
        <rect fill="white" height="100" width="100"></rect>
        <!-- Disegno del simbolo maschile -->
        <path
            style="color: white;fill: black;stroke-width:.333;stroke:#000;stroke-opacity:1;fill-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;"
            d="M8 .666a4.677 4.677 0 0 0-4.666 4.668 4.677 4.677 0 0 0 4 4.617v1.383h-2v1.332h2v2h1.332v-2h2v-1.332h-2V9.951a4.677 4.677 0 0 0 4-4.617A4.677 4.677 0 0 0 8 .666zM8 2a3.324 3.324 0 0 1 3.334 3.334A3.323 3.323 0 0 1 8 8.666a3.323 3.323 0 0 1-3.334-3.332A3.324 3.324 0 0 1 8 2z"
            transform="scale(6.2)"></path>
    </mask>

    <!-- Applicazione della maschera al rettangolo blu -->
    <rect width="100" height="100" fill="blue" mask="url(#mask_venus)" style="fill: white;"></rect>
    <path
        style="color: #000;fill: transparent;stroke-width:.333;stroke:#000;stroke-opacity:1;fill-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;"
        d="M8 .666a4.677 4.677 0 0 0-4.666 4.668 4.677 4.677 0 0 0 4 4.617v1.383h-2v1.332h2v2h1.332v-2h2v-1.332h-2V9.951a4.677 4.677 0 0 0 4-4.617A4.677 4.677 0 0 0 8 .666zM8 2a3.324 3.324 0 0 1 3.334 3.334A3.323 3.323 0 0 1 8 8.666a3.323 3.323 0 0 1-3.334-3.332A3.324 3.324 0 0 1 8 2z"
        transform="scale(6.2)"></path>
</svg>`