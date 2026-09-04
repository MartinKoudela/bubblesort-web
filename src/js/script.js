const numbers = [];

function render() {
    document.getElementById("output").textContent = numbers.join(", ");
}

document.getElementById("addNum").addEventListener("click", () => {
    const input = document.getElementById("input");
    const value = Number(input.value);

    if (input.value === "") {
        return;
    }

    numbers.push(value);
    input.value = "";
    input.focus();
    render();
});

document.getElementById("sort").addEventListener("click", () => {
    const start = performance.now();
    bubbleSort(numbers);
    const end = performance.now();
    render();
    document.getElementById("time").textContent = `Sorting took ${(end - start).toFixed(3)} milliseconds.`;
});
