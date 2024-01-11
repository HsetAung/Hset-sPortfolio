// Selecting elements with the class "dates" and initializing an empty array for holidays
let days = document.getElementsByClassName("dates");
let holidays = [];
let date = new Date(); // Getting the current date

// Calling the function to set up the initial calendar
currentCalendar();

// Function to handle the "Show" button click
function go() {
  // Clearing the dates on the calendar
  clearDates();
  
  // Getting the selected year and month from the input fields
  let years = document.getElementById("year").value;
  let months = document.getElementById("month").value - 1; // Subtracting 1 because months are zero-indexed
  
  // Setting the date to the selected year and month
  date = new Date(years, months);
  
  // Updating the calendar
  currentCalendar();
}

// Function to set up the current month's calendar
function currentCalendar() {
  let current = date;
  current.setDate(1); // Setting the date to the first day of the month
  let startDay = current.getDay(); // Getting the day of the week for the first day
  let countDate = 1;

  // Setting the date to the last day of the previous month
  current.setMonth(current.getMonth() + 1);
  current.setDate(0);
  let endDate = current.getDate(); // Getting the last day of the current month

  // Populating the calendar with dates
  for (let dayCount = startDay; dayCount < 37; dayCount++) {
    if (countDate <= endDate) {
      days[dayCount].innerHTML = countDate++;
    }
  }

  // Check if there are holidays to display for the current month
  displayHolidays();
}

// Function to clear dates on the calendar
function clearDates() {
  for (let dayCount = 0; dayCount < 37; dayCount++) {
    days[dayCount].innerHTML = "";
  }
}

// Function to display the current month
function today() {
  // Clearing the dates on the calendar
  clearDates();
  
  // Setting the date to the current date
  date = new Date();
  
  // Updating the calendar
  currentCalendar();
}

// Function to add a holiday
function addHoliday() {
  // Getting the input fields for date and description
  let dateInput = document.getElementById("date_input");
  let descriInput = document.getElementById("descri_input");

  // Creating a Date object from the input date
  let selectedDate = new Date(dateInput.value);
  let year = selectedDate.getFullYear();
  let month = selectedDate.getMonth();
  let dayOfMonth = selectedDate.getDate();

  // Checking if the selected date is valid
  if (isValidDate(year, month, dayOfMonth)) {
    // Adding the holiday to the array and updating the display
    holidays.push({ year, month, day: dayOfMonth, description: descriInput.value });
    displayHolidays();
  } else {
    alert("Invalid date selection.");
  }

  // Clearing input fields after adding holiday
  dateInput.value = "";
  descriInput.value = "";
}

// Function to check if a date is valid
function isValidDate(year, month, day) {
  let selectedDate = new Date(year, month, day);
  return (
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month &&
    selectedDate.getDate() === day
  );
}

// Function to display holidays on the calendar
function displayHolidays() {
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  for (let holiday of holidays) {
    // Checking if the holiday is for the current month and year
    if (holiday.year === currentYear && holiday.month === currentMonth) {
      let dayElement = days[holiday.day - 1]; // Adjusting index to match array index
      
      // Checking if the day element exists
      if (dayElement) {
        dayElement.style.backgroundColor = "orange";
        // Displaying the holiday information
        dayElement.innerHTML = `<span class="holiday">${holiday.day}<br>${holiday.description}</span>`;
      }
    }
  }
}

// Adding an event listener to the "Show" button to check for valid input
document.querySelector(".show").addEventListener("click", function () {
  let years = document.getElementById("year").value;
  let months = document.getElementById("month").value - 1;

  // Check if the selected month is valid (between 1 and 12) and the year is a non-empty string
  if ((months >= 0 && months <= 11) && (years.trim() !== '')) {
    go(); // If valid, proceed with the calendar update
  } else {
    alert("Invalid month or year!");
  }
});
