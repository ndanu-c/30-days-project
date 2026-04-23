const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const historyEl = document.getElementById("history");

let current = "";
let previous = "";
let operator = null;

let history = JSON.parse(localStorage.getItem("history")) || [];
renderHistory();

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (value) handleNumber(value);
        if (action) handleAction(action);
    });
});

function handleNumber(value) {
    current += value;
    updateDisplay(current);
}

function handleAction(action) {
    if (action === "clear") {
        current = "";
        previous = "";
        operator = null;
        updateDisplay("0");
    }

    if (action === "delete") {
        current = current.slice(0, -1);
        updateDisplay(current || "0");
    }

    if (action === "equals") {
        if (previous && current && operator) {
            const result = calculate(previous, current, operator);
            saveHistory(previous, operator, current, result);
            current = result.toString();
            previous = "";
            operator = null;
            updateDisplay(current);
        }
    }
}

buttons.forEach(btn => {
    if (btn.dataset.value && "+-*/".includes(btn.dataset.value)) {
        btn.addEventListener("click", () => {
            if (!current) return;
            operator = btn.dataset.value;
            previous = current;
            current = "";
        });
    }
});

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b === 0 ? "Error" : a / b;
}

function updateDisplay(value) {
    display.textContent = value;
}

function saveHistory(a, op, b, result) {
    const entry = `${a} ${op} ${b} = ${result}`;
    history.push(entry);
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyEl.innerHTML = history.slice(-5).map(item => `<div>${item}</div>`).join("");
}

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || e.key === ".") {
        handleNumber(e.key);
    }

    if ("+-*/".includes(e.key)) {
        if (!current) return;
        operator = e.key;
        previous = current;
        current = "";
    }

    if (e.key === "Enter") {
        handleAction("equals");
    }

    if (e.key === "Backspace") {
        handleAction("delete");
    }

    if (e.key === "Escape") {
        handleAction("clear");
    }
});