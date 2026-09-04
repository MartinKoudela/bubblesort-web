document.getElementById("addNum").addEventListener("click", () => {
    const input = document.getElementById("input");
    const value = Number(input.value);

    if (input.value === "") {
        return;
    }

    numbers.push(value);
    input.value = "";
    input.focus();

    if (typeof resetVisualization === "function") {
        resetVisualization();
    }

    render();
});