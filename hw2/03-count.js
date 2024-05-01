document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("userInput");
  const textContainer = document.getElementById("textToHighlight");
  const originalText = textContainer.textContent;

  // Function to escape regex special characters to avoid unexpected behavior
  const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Function to highlight the word in the text container when enter is pressed
  const highlightWord = (event) => {
    if (event.key === "Enter") {
      const searchTerm = escapeRegex(userInput.value.trim());

      // Check if the input is empty and reset the text container if true
      if (!searchTerm) {
        textContainer.innerHTML = originalText;
        return;
      }

      // Create a regex to find full words that match the search term in a case-insensitive manner
      const regex = new RegExp(`\\b(${searchTerm})\\b`, "gi");

      // Replace found words with the same words wrapped in a <mark> tag
      const highlightedText = originalText.replace(regex, "<mark>$1</mark>");
      textContainer.innerHTML = highlightedText;
    }
  };

  // Add event listener to the user input to trigger the highlighting function on keydown
  userInput.addEventListener("keydown", highlightWord);
});
