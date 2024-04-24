// Add your code here
document.addEventListener("DOMContentLoaded", () => {
  const bodyElement = document.body;
  const intervalInput = document.getElementById("intervalInput");
  const toggleButton = document.getElementById("toggleButton");
  let intervalId = null;
  let isRunning = false;

  // Function to change the background color of the body to a random semi-transparent color
  const changeBackgroundColor = () => {
    // Generate a random color using RGBA format with 50% opacity
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    bodyElement.style.backgroundColor = color;
  };

  // Function to start changing the background color at a given interval
  const startChangingBackground = (interval) => {
    if (intervalId) clearInterval(intervalId);
    // Setting up a new interval that changes the background color every 'interval' seconds
    intervalId = setInterval(changeBackgroundColor, interval * 1000);
    // Update the running state and button appearance
    isRunning = true;
    toggleButton.textContent = "Stop";
    toggleButton.classList.replace("btn-primary", "btn-danger");
  };

  // Function to stop the background color from changing
  const stopChangingBackground = () => {
    // Clear the interval to stop the background color changing
    clearInterval(intervalId);
    // Update the running state and button appearance
    isRunning = false;
    toggleButton.textContent = "Start";
    toggleButton.classList.replace("btn-danger", "btn-primary");
  };

  // Add an event listener to the toggle button to start or stop the color changing
  toggleButton.addEventListener("click", () => {
    // Check if the background color changing is currently running
    if (isRunning) {
      // If running, stop changing the background color
      stopChangingBackground();
    } else {
      // If not running, start changing the background color with the interval specified by the user or default to 3 seconds
      const interval = parseInt(intervalInput.value, 10) || 3;
      startChangingBackground(interval);
    }
  });

  // Initially set the background color to a random color
  changeBackgroundColor();
  // Start changing the background color at a default interval of 3 seconds
  startChangingBackground(3);
});
