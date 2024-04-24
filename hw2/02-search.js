document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("results");

  // Function to highlight the search term within a string
  const highlightTerm = (text, term) => {
    if (!term) return text; // Return the original text if no search term is provided
    // Create a regex with capturing group to maintain original text case
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(
      regex,
      `<mark style="background-color: #ffff00; color: black;">$1</mark>`
    );
  };

  // Function to create a Bootstrap card HTML with the name highlighted if a searchTerm is present
  const createCard = (character, searchTerm = "") => {
    const highlightedName = highlightTerm(character.name, searchTerm);
    return `
      <div class="col-auto mb-4">
        <div class="card text-center" style="width: 18rem;">
          <div class="card-body">
            <h2 class="card-title">${highlightedName}</h2>
            <p class="card-text">Birth Year: ${character.birth_year}</p>
          </div>
        </div>
      </div>
    `;
  };

  // Function to display all characters or filtered characters based on a search term
  const displayCharacters = (searchTerm = "") => {
    resultsContainer.innerHTML = ""; // Clear existing cards
    const charactersToDisplay = searchTerm
      ? characters.filter((char) =>
          char.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : characters;

    if (charactersToDisplay.length === 0) {
      resultsContainer.innerHTML =
        '<div class="col text-center mb-4">No characters found.</div>'; // Display a no results message
      return;
    }

    charactersToDisplay.forEach((character) => {
      resultsContainer.innerHTML += createCard(character, searchTerm); // Append new cards
    });
  };

  // Initialize the page with all characters
  displayCharacters();

  // Attach event to search button to trigger character display based on search
  document.getElementById("searchButton").addEventListener("click", () => {
    const searchValue = document
      .getElementById("userInput")
      .value.trim()
      .toLowerCase();
    displayCharacters(searchValue);
  });
});
