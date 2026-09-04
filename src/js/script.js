const numbers = [];

function render() {
    document.getElementById("output").textContent = numbers.join(", ");
}

document.getElementById("sort").addEventListener("click", () => {
    const start = performance.now();
    bubbleSort(numbers);
    const end = performance.now();
    render();
    document.getElementById("time").textContent = `Sorting took ${(end - start).toFixed(3)} milliseconds.`;
});
