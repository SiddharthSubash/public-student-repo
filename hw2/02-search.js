document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("results");

  // Function to highlight the search term within a string
  const highlightTerm = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
  };

  // Function to create a card for a character or a no-results message
  const createCard = (character, searchTerm = "", noResults = false) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-auto mb-4";
    cardDiv.style.width = "18rem";

    const card = document.createElement("div");
    card.className = "card text-center";
    card.style.minHeight = "150px";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const title = document.createElement("h2");
    title.className = "card-title";

    // Display no results message
    if (noResults) {
      title.innerHTML = "No characters found";
    } else {
      title.innerHTML = highlightTerm(character.name, searchTerm);
    }

    cardBody.appendChild(title);

    if (!noResults) {
      const text = document.createElement("p");
      text.className = "card-text";
      text.textContent = `Birth Year: ${character.birth_year}`;
      cardBody.appendChild(text);
    }

    card.appendChild(cardBody);
    cardDiv.appendChild(card);
    return cardDiv;
  };

  // Function to display all characters or filtered characters based on a search term
  const displayCharacters = (searchTerm = "") => {
    resultsContainer.innerHTML = ""; // Clear the container first
    const charactersToDisplay = searchTerm
      ? characters.filter((char) =>
          char.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : characters;

    // Appending "No characters found" card if no matches
    if (charactersToDisplay.length === 0) {
      resultsContainer.appendChild(createCard({}, "", true));
    } else {
      charactersToDisplay.forEach((character) => {
        resultsContainer.appendChild(createCard(character, searchTerm));
      });
    }
  };

  // Attach event to the search button to trigger character display based on search
  document.getElementById("searchButton").addEventListener("click", () => {
    const searchValue = document
      .getElementById("userInput")
      .value.trim()
      .toLowerCase();
    displayCharacters(searchValue);
  });

  // Initialize the page with all characters displayed
  displayCharacters();
});
