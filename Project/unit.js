// Declaring const for toggle Menu
const burger = document.getElementById("burger");
const list = document.getElementById("list");

// Event for menu option
const menu = burger.addEventListener("click", () => {
    list.classList.toggle("list");
});

// Toggle class for expanding menu list
const toggleMenu = document.getElementById('toggleMenu');
const marg = burger.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggleMenu");
});

// Add event listeners for category images (Length, Weight, Temperature)
const addCategoryEventListeners = () => {
    document.getElementById('length').addEventListener('click', () => createConversionForm('length'));
    document.getElementById('weigth').addEventListener('click', () => createConversionForm('weight'));
    document.getElementById('temperature').addEventListener('click', () => createConversionForm('temperature'));
};

// Attach event listeners to categories initially
addCategoryEventListeners();



// Categories for unit conversion
const categories = {
    //More can be added from https://mathjs.org/docs/datatypes/units.html#units
    length:
        { Meter: 'm', Kilometer: 'km', Centimeter: 'cm', Foot: 'ft', Yard: 'yd', Mile: 'mi' },
    weight:
        { Gram: 'g', Kilogram: 'kg' },
    temperature:
        { Celsius: 'degC', Fahrenheit: 'degF', Kelvin: 'K' }
};

// Function to dynamically create the conversion form
const createConversionForm = (category) => {

    const length = document.getElementById('length');
    const weight = document.getElementById('weigth');
    const temperature = document.getElementById('temperature');

    // Hide the categories
    length.style.display = 'none';
    weight.style.display = 'none';
    temperature.style.display = 'none';

    // Create input fields and select dropdowns
    let inputFirst = document.createElement('input');
    inputFirst.setAttribute('id', 'inputFirst');
    inputFirst.type = 'number';
    let selectFirst = document.createElement("select");
    selectFirst.setAttribute('id', 'selectFirst');
    let inputSecond = document.createElement('input');
    inputSecond.setAttribute('id', 'inputSecond');
    inputSecond.type = 'number';
    let selectSecond = document.createElement("select");
    selectSecond.setAttribute('id', 'selectSecond');
    let resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.style.cssText = "background-color: #551606; color: white; padding: 0.5rem 2rem; border-radius: 10px; cursor: pointer;";

    // Add options to the select dropdowns based on the category
    // Add options to the select dropdowns based on the selected category
    let categoryUnits = categories[category];  // Access the selected category
    for (let unit in categoryUnits) {
        let option1 = document.createElement('option');
        option1.value = categoryUnits[unit];
        option1.innerText = unit;
        selectFirst.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = categoryUnits[unit];
        option2.innerText = unit;
        selectSecond.appendChild(option2);
    }

    // Append the new elements to the DOM
    let parentElement = document.getElementById('container');
    parentElement.appendChild(inputFirst);
    parentElement.appendChild(selectFirst);
    parentElement.appendChild(inputSecond);
    parentElement.appendChild(selectSecond);
    parentElement.appendChild(resetButton);

    // Conversion Logic
    inputFirst.addEventListener('input', () => {
        let convertedValue;
        let value = parseFloat(inputFirst.value);
        if (isNaN(value)) {
            inputSecond.value = ''; // Clear the second input if the first is invalid
            return; // Stop the function if input is invalid
        };
        // Convert value based on selected units
        let fromUnit = selectFirst.value;
        let toUnit = selectSecond.value;
        try {
            convertedValue = math.unit(value, fromUnit).to(toUnit);
            inputSecond.value = convertedValue.toNumber();
        } catch (error) {
            console.log('Error');
        }
    });

    // Reset Logic
    resetButton.addEventListener('click', () => {
        // Clear inputs and reset dropdowns
        inputFirst.value = '';
        inputSecond.value = '';
        selectFirst.value = categories[category][0];
        selectSecond.value = categories[category][0];

        // Show the categories again
        document.getElementById('container').innerHTML = `
            <figure id="length">
                <img src="6637342.png" alt="Length Image">
                <figcaption>Length</figcaption>
            </figure>
            <figure id="weigth">
                <img src="kg.png" alt="Weight Image">
                <figcaption>Weight</figcaption>
            </figure>
            <figure id="temperature">
                <img src="temp.png" alt="Temperature Image">
                <figcaption>Temperature</figcaption>
            </figure>
        `;

        // Reattach event listeners after resetting
        addCategoryEventListeners();
    });
};