const sliderValue = document.getElementById("slider-value");
const gridSize = document.getElementById("grid-size");

gridSize.oninput = () => {
    sliderValue.textContent = gridSize.value + " x " + gridSize.value;
}