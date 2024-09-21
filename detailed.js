// Function to display detailed listing

// Add event listener to listing-card (replace this logic with your card event handler)
document.querySelector("listing-card").addEventListener("click", showDetails);

// Function to go back to listings view
function goBack() {
  document.getElementById("section").classList.remove("hidden");
  // Show listing cards
  document.querySelector("listing-card").style.display = "grid";

  // Hide details section
  document.getElementById("details-section").style.display = "none";
}
