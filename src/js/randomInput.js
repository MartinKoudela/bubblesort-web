const rangeEl = document.getElementById("range");

noUiSlider.create(rangeEl, {
    start: [1, 100],
    connect: true,
    step: 1,
    range: {min: 0, max: 1000},
    format: {to: v => Math.round(v), from: v => Number(v)}
});

document.getElementById("count").addEventListener("input", (e) => {
    document.getElementById("countValue").textContent = e.target.value;
});

rangeEl.noUiSlider.on("update", (values, handle) => {
    document.getElementById("rangeValues").textContent = `${values[0]} – ${values[1]}`;
});

document.getElementById("random").addEventListener("click", () => {
    document.getElementById("randomPanel").classList.remove("hidden");
});

document.getElementById("confirm").addEventListener("click", () => {
    const [min, max] = rangeEl.noUiSlider.get();
    const count = Number(document.getElementById("count").value);

    numbers.length = 0;
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    render();
    document.getElementById("randomPanel").classList.add("hidden");
});

