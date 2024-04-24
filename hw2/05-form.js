document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const modalBody = document.querySelector(".modal-body");
  const submitModal = new bootstrap.Modal(
    document.getElementById("submitModal")
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    modalBody.innerHTML = "";

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Array to store the names of selected courses
    let selectedCourses = [];

    // Iterate over all form elements
    Array.from(form.elements).forEach((element) => {
      // Skip elements without a name or of type submit or checkbox
      if (
        !element.name ||
        element.type === "submit" ||
        element.type === "checkbox"
      )
        return;

      // Create a div for each input's label and value
      const entryDiv = document.createElement("div");
      const labelSpan = document.createElement("span");
      labelSpan.className = "modal-label";
      labelSpan.textContent = `${element.name}: `;
      entryDiv.appendChild(labelSpan);

      const valueSpan = document.createElement("span");
      valueSpan.className = "modal-value";
      valueSpan.textContent = element.value;
      entryDiv.appendChild(valueSpan);

      modalBody.appendChild(entryDiv);
    });

    // Separate loop for checkboxes to ensure they are added in order at the end
    form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox.checked) {
        selectedCourses.push(checkbox.nextElementSibling.textContent);
      }
    });

    // Add the 'Courses Taken' section if there are any selected courses
    if (selectedCourses.length > 0) {
      const coursesDiv = document.createElement("div");
      const coursesLabelSpan = document.createElement("span");
      coursesLabelSpan.className = "modal-label";
      coursesLabelSpan.textContent = "Courses Taken: ";
      coursesDiv.appendChild(coursesLabelSpan);

      const coursesValueSpan = document.createElement("span");
      coursesValueSpan.className = "modal-value";
      coursesValueSpan.textContent = selectedCourses.join(", ");
      coursesDiv.appendChild(coursesValueSpan);

      modalBody.appendChild(coursesDiv);
    }

    submitModal.show();
    form.classList.remove("was-validated");
  };

  form.addEventListener("submit", handleSubmit);
});
