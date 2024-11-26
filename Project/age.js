const burger = document.getElementById("burger");
const list = document.getElementById("list");

const menu = burger.addEventListener("click", () => {
    list.classList.toggle("list");
});

const toggleMenu = document.getElementById('toggleMenu');
const marg = burger.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggleMenu");
});

function cal() {
    // Get the birthdate from the input
    const birthdateInput = document.getElementById('date').value;
    if (!birthdateInput) {
        alert("Please enter a valid birthdate.");
        return;
    }

    // Convert the input to a Date object
    const birthdate = new Date(birthdateInput);

    // Get the current date and time
    const currentDate = new Date();

    if (birthdate > currentDate) {
        alert("Please enter a valid birthdate.");
        return;
    }

    // Calculate age in years, months, days, hours, minutes, and seconds
    let years = currentDate.getFullYear() - birthdate.getFullYear();
    let months = currentDate.getMonth() - birthdate.getMonth();
    let days = currentDate.getDate() - birthdate.getDate();
    let hours = currentDate.getHours() - birthdate.getHours();
    let minutes = currentDate.getMinutes() - birthdate.getMinutes();
    let seconds = currentDate.getSeconds() - birthdate.getSeconds();

    // Adjust if necessary
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += lastDayOfPreviousMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    // Display the result
    const result = `
                Age is: ${years}years, ${months}months, ${days}days.
            `;
    const resultElement = document.getElementById('para');
    resultElement.textContent = result;
    resultElement.style.display = 'block'; // Show the result paragraph
}