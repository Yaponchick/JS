const button = document.querySelector('button');
const hexText = document.querySelector('.hex-color');

const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

function generateHex() {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNumber()];
    }
    return hexColor;
}

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}

button.addEventListener("click", () => {
    let hexColor = generateHex();
    document.body.style.background = hexColor;
    hexText.textContent = hexColor;
});


