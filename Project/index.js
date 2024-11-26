const burger = document.getElementById("burger");
const list = document.getElementById("list");

const menu = burger.addEventListener("click", () => {
    list.classList.toggle("list");
});

const toggleMenu = document.getElementById('toggleMenu');
const marg = burger.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggleMenu");
});

function appendToDIspaly(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = '';
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let display = document.getElementById("display");
    let expression = display.value;
    let result;

    if (expression.startsWith('log(') && expression.endsWith(')')) {
        expression = expression.slice(4, -1);
        expression = math.log10(expression);
        expression = math.round(expression, 10);
        display.value = expression;
    }

    if (expression.startsWith('tan(') && expression.endsWith(')')) {
        expression = expression.slice(4, -1);

        if (expression % 180 === 90 || expression % 180 === -90) {
            display.value = 'Infinity';
        }

        else {
            let calculate = (math.PI / 180) * expression;
            let calculated = math.tan(calculate);
            calculated = math.round(calculated, 10);
            display.value = calculated;
        };
    }

    else {
        try {
            // Convert trigonometric function inputs from degrees to radians
            expression = expression.replace(/sin\(/g, 'sin(' + Math.PI / 180 + '*');
            expression = expression.replace(/cos\(/g, 'cos(' + Math.PI / 180 + '*');

            result = math.evaluate(expression);

            result = math.round(result, 10);

            display.value = result;
        } catch (error) {
            display.value = "Error";
        }
    }
}