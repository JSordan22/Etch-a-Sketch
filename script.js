const sliderValue = document.getElementById("slider-value");
const gridSize = document.getElementById("grid-size");
const colorWheel = document.querySelector("-webkit-color-swatch");
const grid = document.getElementById("grid");

gridSize.oninput = () => {
    removeChildren(grid);
    sliderValue.textContent = gridSize.value + " x " + gridSize.value;
    makeGrid(gridSize.value);
}

function makeRow(value) {
    let row = document.createElement("div");

    for(let i = 0; i < value; i++) {
        let node = document.createElement("div");
        node.classList.add("node");
        addColorEvent(node);
        setElementProperties(node, value);
        row.appendChild(node);
    }
    return row;
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

function addColorEvent(element) {
    element.onmouseover = () => {
        changeColor(element);
    }
}

function changeColor(element) {    
    switch(document.querySelector('input[name="markup"]:checked').value) {
        case "basic":
            element.style.backgroundColor = currColor;
            break;
        case "lighten":
            element.style.opacity -= 0.1;
            break;
        case "darken":
            element.style.opacity = parseFloat(element.style.opacity) + 0.1;
            break;
        case "rainbow":
            element.style.backgroundColor = generateRandomColor();
            break;
        case "eraser":
            element.style.backgroundColor = "white";
    }
}

function generateRandomColor() {
    let hexValues = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return "#" + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)] + hexValues[Math.floor(Math.random() * 16)];
}

function setElementProperties(element, value) {
    element.style.width = grid.offsetWidth / value + "px";
    element.style.height = grid.offsetHeight / value + "px";
    element.style.cursor = "pointer";
}

function makeGrid(value) {
    for(let i = 0; i < value; i++) {
        grid.appendChild(makeRow(value));
    }
}

window.onload = () => {
    makeGrid(gridSize.value);
}