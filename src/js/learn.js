const numbers = [];
let steps = [];
let current = 0;
let bars = [];
const BAR_BASE = "flex-1 rounded-t text-center text-xs text-white transition-all duration-300";

function resetVisualization() {
    steps = [];
    current = 0;
    bars = [];
    document.getElementById("chart").innerHTML = "";
    document.getElementById("caption").textContent = "";
    updateButtons();
}

function render() {
    document.getElementById("output").textContent = numbers.join(", ");
}

function barColor(step, index) {
    if (index !== step.i && index !== step.j) {
        return "bg-blue-400";
    }
    return step.type === "swap" ? "bg-red-500" : "bg-yellow-400";
}

function buildChart(count) {
    const chart = document.getElementById("chart");
    chart.innerHTML = "";
    bars = [];

    for (let i = 0; i < count; i++) {
        const bar = document.createElement("div");
        bar.className = `${BAR_BASE} bg-blue-400`;
        chart.append(bar);
        bars.push(bar);
    }
}

function showStep(n) {
    const step = steps[n];
    updateButtons();
    if (!step) {
        return;
    }

    const max = Math.max(...step.snapshot);

    step.snapshot.forEach((value, index) => {
        const bar = bars[index];
        bar.style.height = `${(value / max) * 100}%`;
        bar.textContent = value;
        bar.className = `${BAR_BASE} ${barColor(step, index)}`;
    });

    const a = step.snapshot[step.i];
    const b = step.snapshot[step.j];
    document.getElementById("caption").textContent = step.type === "swap"
        ? `Step ${n + 1}/${steps.length}: swapped — ${b} is greater than ${a}`
        : `Step ${n + 1}/${steps.length}: comparing ${a} and ${b}`;
}

document.getElementById("sort").addEventListener("click", () => {
    steps = [];
    bubbleSort(numbers, (arr, i, j, type) => steps.push({snapshot: [...arr], i, j, type}));
    current = 0;
    render();

    if (steps.length === 0) {
        resetVisualization();
        return;
    }

    buildChart(numbers.length);
    showStep(current);
});

document.getElementById("prev").addEventListener("click", () => {
    if (current > 0) showStep(--current);
});

document.getElementById("next").addEventListener("click", () => {
    if (current < steps.length - 1) showStep(++current);
});

function updateButtons() {
    document.getElementById("prev").disabled = current === 0;
    document.getElementById("next").disabled = current >= steps.length - 1;
}