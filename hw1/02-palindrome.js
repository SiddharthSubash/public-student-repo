// Element selectors using const for immutability
const inputElem = document.getElementById("positiveNumber");
const resultElem = document.getElementById("palindromeResult");

// Function to check if a string is a palindrome, utilizing an arrow function for clarity and conciseness
const isPalindrome = (str) => str === str.split("").reverse().join("");

// Function to validate input, ensuring it meets criteria such as not being empty, a valid number, and non-negative
const validateInput = (input) => {
  if (input.trim() === "") {
    return {
      isValid: false,
      message: "Please enter a number.",
      className: "text-danger",
    };
  }

  const num = parseFloat(input);
  if (isNaN(num)) {
    return {
      isValid: false,
      message: "Please enter a valid number.",
      className: "text-danger",
    };
  }

  if (num < 0) {
    return {
      isValid: false,
      message: "Please enter a positive number.",
      className: "text-danger",
    };
  }

  return { isValid: true };
};

// Function to update the user interface, setting text and class based on the result
const updateUI = (message, className) => {
  resultElem.textContent = message;
  resultElem.className = className;
};

// Main function handling input events, orchestrating the validation, palindrome check, and UI update
const handleInput = () => {
  const numStr = inputElem.value;
  const validationResult = validateInput(numStr);

  if (!validationResult.isValid) {
    updateUI(validationResult.message, validationResult.className);
    return;
  }

  const message = isPalindrome(numStr)
    ? "Yes. This is a palindrome!"
    : "No. Try again.";
  const className = isPalindrome(numStr) ? "text-success" : "text-danger";
  updateUI(message, className);
};

// Event listener for input changes
inputElem.addEventListener("input", handleInput);
