function handleInput() {
  resultElem.textContent = "";
  resultElem.className = "";

  const numStr = inputElem.value.trim();

  if (numStr === "" || isNaN(numStr)) {
    resultElem.textContent = "Please enter a number.";
    resultElem.className = "text-danger";
    return;
  }

  const num = parseFloat(numStr);

  if (num < 0 || isNaN(num)) {
    resultElem.textContent = "Please enter a positive number.";
    resultElem.className = "text-danger";
    return;
  }

  if (isPalindrome(numStr)) {
    resultElem.textContent = "Yes. This is a palindrome!";
    resultElem.className = "text-success";
  } else {
    resultElem.textContent = "No. Try again.";
    resultElem.className = "text-danger";
  }
}

function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

const inputElem = document.getElementById("positiveNumber");
const resultElem = document.getElementById("palindromeResult");

inputElem.addEventListener("input", handleInput);
