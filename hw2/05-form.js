document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const modalBody = document.querySelector(".modal-body");

  // Initialize the modal using Bootstrap's JavaScript component
  const submitModal = new bootstrap.Modal(
    document.getElementById("submitModal")
  );

  // Define the event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Exit the function if the form is invalid
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Create a new FormData object to handle form data
    const formData = new FormData(form);
    // Initialising a string to hold the display data for the modal
    let displayData = "";
    // Initialising an array to store selected course names
    let courses = [];

    // Iterate through each element in the form
    Array.from(form.elements).forEach((element) => {
      if (element.name && element.type !== "checkbox") {
        displayData += `<div><strong><span class="modal-label">${element.name}:</span></strong> <span class="modal-value">${element.value}</span></div>`;
      } else if (element.type === "checkbox" && element.checked) {
        courses.push(element.nextElementSibling.textContent);
      }
    });

    // If any courses were selected, append them to the displayData string
    if (courses.length > 0) {
      displayData += `<div><strong><span class="modal-label">Courses Taken:</span></strong> <span class="modal-value">${courses.join(
        ", "
      )}</span></div>`;
    }
    modalBody.innerHTML = `${displayData}`;

    submitModal.show();

    // Remove the validation class from the form to reset its state
    form.classList.remove("was-validated");
  };

  // Attach the handleSubmit function to the form's submit event
  form.addEventListener("submit", handleSubmit);
});
