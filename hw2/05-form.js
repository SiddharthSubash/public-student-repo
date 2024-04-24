document.addEventListener("DOMContentLoaded", () => {
  // Get the form and modal elements from the document
  const form = document.getElementById("userForm");
  const modalBody = document.querySelector(".modal-body");
  // Initialize the Bootstrap modal component
  const submitModal = new bootstrap.Modal(
    document.getElementById("submitModal")
  );

  // Define the event handler for the form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Exit the function if the form is not valid
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Clear the modal body content for new input
    modalBody.innerHTML = "";

    // Prepare to collect names of courses if any checkboxes are checked
    let courses = [];

    // Iterate through each form element
    Array.from(form.elements).forEach((element) => {
      if (!element.name) return;

      // Create a div for each form field to hold the label and value
      const div = document.createElement("div");
      const strong = document.createElement("strong");
      const spanLabel = document.createElement("span");
      spanLabel.className = "modal-label";
      spanLabel.textContent = `${element.name}: `;
      strong.appendChild(spanLabel);

      // Create a span for the value, only if it's not a checkbox
      if (element.type !== "checkbox") {
        const spanValue = document.createElement("span");
        spanValue.className = "modal-value";
        spanValue.textContent = element.value; // Use textContent for secure text insertion
        strong.appendChild(spanValue);
        div.appendChild(strong);
        modalBody.appendChild(div);
      } else if (element.checked) {
        courses.push(element.nextElementSibling.textContent);
      }
    });

    // Append course information if any checkboxes were checked
    if (courses.length > 0) {
      const div = document.createElement("div");
      const strong = document.createElement("strong");
      const spanLabel = document.createElement("span");
      spanLabel.className = "modal-label";
      spanLabel.textContent = "Courses Taken: ";
      strong.appendChild(spanLabel);

      const spanValue = document.createElement("span");
      spanValue.className = "modal-value";
      spanValue.textContent = courses.join(", "); // Join course names with a comma
      strong.appendChild(spanValue);
      div.appendChild(strong);
      modalBody.appendChild(div);
    }

    // Show the modal with contents filled in the form
    submitModal.show();
    // Remove the 'was-validated' class to reset the form's validation state
    form.classList.remove("was-validated");
  };

  // Attach the handleSubmit function to the form's submit event
  form.addEventListener("submit", handleSubmit);
});
