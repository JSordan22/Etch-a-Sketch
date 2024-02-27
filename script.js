const sliderValue = document.getElementById("slider-value");
const gridSize = document.getElementById("grid-size");
const colorWheel = document.getElementById("curr-color");
const grid = document.getElementById("grid");
const reset = document.getElementById("reset");

gridSize.oninput = () => {
    removeChildren(grid);
    sliderValue.textContent = gridSize.value + " x " + gridSize.value;
    makeGrid(gridSize.value);
}

reset.onclick = () => {
    removeChildren(grid);
    makeGrid(gridSize.value);
    colorWheel.value = "rgb(255, 255, 255)";
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

function makeRow(value) {
    let row = document.createElement("div");

    for(let i = 0; i < value; i++) {
        let node = document.createElement("div");
        node.classList.add("node");
        setColorEvent(node);
        setElementProperties(node, value);
        row.appendChild(node);
    }
    return row;
}

function setColorEvent(element) {
    element.onmouseover = () => {
        changeColor(element);
    }
}

function setElementProperties(element, value) {
    element.style.width = grid.offsetWidth / value + "px";
    element.style.height = grid.offsetHeight / value + "px";
    element.style.backgroundColor = "rgb(255, 255, 255)";
    element.style.cursor = "pointer";
}

function changeColor(element) {    
    switch(document.querySelector('input[name="markup"]:checked').value) {
        case "basic":
            element.style.backgroundColor = colorWheel.value;
            break;
        case "lighten":
            console.log(element.style.backgroundColor);
            element.style.backgroundColor = lighten(element);
            break;
        case "darken":
            console.log(element.style.backgroundColor);
            element.style.backgroundColor = darken(element);
            break;
        case "rainbow":
            let rndmColor = generateRandomColor();
            colorWheel.value = rndmColor;
            element.style.backgroundColor = rndmColor;
            break;
        case "eraser":
            element.style.backgroundColor = "rgb(255, 255, 255)";
    }
}

function lighten(element) {
    let rgbArr = element.style.backgroundColor.substring(4, element.style.backgroundColor.length - 1).split(",");
    console.log("rgb(" + (parseInt(rgbArr[0]) + Math.ceil((255 - parseInt(rgbArr[0])) / 10)) + ", " + (parseInt(rgbArr[1]) + Math.ceil((255 - parseInt(rgbArr[1])) / 10)) + ", " + (parseInt(rgbArr[2]) + Math.ceil((255 - parseInt(rgbArr[2])) / 10)) + ")");
    return "rgb(" + (parseInt(rgbArr[0]) + Math.ceil((255 - parseInt(rgbArr[0])) / 10)) + ", " + (parseInt(rgbArr[1]) + Math.ceil((255 - parseInt(rgbArr[1])) / 10)) + ", " + (parseInt(rgbArr[2]) + Math.ceil((255 - parseInt(rgbArr[2])) / 10)) + ")";
}

function darken(element) {
    let rgbArr = element.style.backgroundColor.substring(4, element.style.backgroundColor.length - 1).split(",");
    console.log("rgb(" + (parseInt(rgbArr[0]) - Math.ceil((256 - parseInt(rgbArr[0])) / 10)) + ", " + (parseInt(rgbArr[1]) - Math.ceil((255 - parseInt(rgbArr[1])) / 10)) + ", " + (parseInt(rgbArr[2]) - Math.ceil((255 - parseInt(rgbArr[2])) / 10)) + ")");
    return "rgb(" + (parseInt(rgbArr[0]) - Math.ceil((256 - parseInt(rgbArr[0])) / 10)) + ", " + (parseInt(rgbArr[1]) - Math.ceil((256 - parseInt(rgbArr[1])) / 10)) + ", " + (parseInt(rgbArr[2]) - Math.ceil((256 - parseInt(rgbArr[2])) / 10)) + ")";
}

function generateRandomColor() {
    let hexValues = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return "#" + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)];
}

function makeGrid(value) {
    for(let i = 0; i < value; i++) {
        grid.appendChild(makeRow(value));
    }
}

window.onload = () => {
    makeGrid(gridSize.value);
}