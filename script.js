// import { listingCard } from "./listing.js";

const updateVisibility = () => {
  const clearButton = document.querySelector(".clear-button-design");

  if (!selectedFilterData || selectedFilterData.length === 0) {
    clearButton.classList.add("invisible");
  } else {
    clearButton.classList.remove("invisible");
  }
};

document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }
  document.querySelectorAll("[data-dropdown].active").forEach((dropDown) => {
    if (dropDown === currentDropdown) return;
    dropDown.classList.remove("active");
  });
});

let selectedFilterData = [];

// Checkbox filters
document
  .getElementById("choose-number-1")
  .addEventListener("click", function () {
    document.querySelector(".active").classList.remove("active");
    const selectedFilters = [];

    document
      .querySelectorAll("#filters input[type='checkbox']:checked")
      .forEach((checkbox) => {
        const label = checkbox.parentElement.textContent.trim();
        selectedFilters.push(label);
      });

    selectedFilters.forEach((filter) => {
      if (!selectedFilterData.includes(filter)) {
        selectedFilterData.push(filter);

        const filterList = document.getElementById("selected-filters");
        const div = document.createElement("div");

        div.innerHTML = `
      <div class="filtered-by-functionality" functionality>
        <div class="filtered-by region">${filter}</div>
        <button class="remove-filter-x" clear-x>x</button>
      </div>`;

        filterList.appendChild(div);

        // Add event listener for removing filters
        div.querySelector(".remove-filter-x").addEventListener("click", () => {
          selectedFilterData = selectedFilterData.filter(
            (item) => item !== filter
          );
          div.remove();
          updateVisibility();
        });
      }
    });

    // Clear the checkboxes after selection
    document
      .querySelectorAll("#filters input[type='checkbox']")
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    console.log("Saved Filters:", selectedFilterData);
    updateVisibility();
  });

// Price range filter
document
  .getElementById("choose-number-2")
  .addEventListener("click", function () {
    console.log("Price range selected");
    document.querySelector(".active").classList.remove("active");

    const lowerBound = document.getElementById("lari-lower").value;
    const upperBound = document.getElementById("lari-upper").value;

    if (lowerBound && upperBound) {
      const priceRangeFilter = `${lowerBound}₾ - ${upperBound}₾`;

      document.getElementById("lari-lower").value = "";
      document.getElementById("lari-upper").value = "";
      if (!selectedFilterData.includes(priceRangeFilter)) {
        selectedFilterData.push(priceRangeFilter);

        const filterList = document.getElementById("selected-filters");
        const div = document.createElement("div");

        div.innerHTML = `
      <div class="filtered-by-functionality" functionality>
        <div class="filtered-by lari-lower-upper">${priceRangeFilter}</div>
        <button class="remove-filter-x" clear-x>x</button>
      </div>`;

        filterList.appendChild(div);

        // Add event listener for removing filters
        div.querySelector(".remove-filter-x").addEventListener("click", () => {
          selectedFilterData = selectedFilterData.filter(
            (item) => item !== priceRangeFilter
          );
          div.remove();
          updateVisibility();
        });
      }
      console.log(
        document
          .querySelector(".lari-lower-upper")
          .textContent.replaceAll("₾", "")
          .split(" - ")
      );
      console.log("Saved Filters:", selectedFilterData);
    } else {
      console.log("Error: Both price range values are required.");
    }

    updateVisibility();
  });

// Area range filter
document
  .getElementById("choose-number-3")
  .addEventListener("click", function () {
    console.log("Area range selected");
    document.querySelector(".active").classList.remove("active");

    const lowerBound = document.getElementById("area-lower").value;
    const upperBound = document.getElementById("area-upper").value;

    if (lowerBound && upperBound) {
      const areaRangeFilter = `${lowerBound}მ² - ${upperBound}მ²`;

      if (!selectedFilterData.includes(areaRangeFilter)) {
        selectedFilterData.push(areaRangeFilter);
        document.getElementById("area-lower").value = "";
        document.getElementById("area-upper").value = "";
        const filterList = document.getElementById("selected-filters");
        const div = document.createElement("div");

        div.innerHTML = `
      <div class="filtered-by-functionality" functionality>
        <div class="filtered-by area-lower-upper">${areaRangeFilter}</div>
        <button class="remove-filter-x" clear-x>x</button>
      </div>`;

        filterList.appendChild(div);

        // Add event listener for removing filters
        div.querySelector(".remove-filter-x").addEventListener("click", () => {
          selectedFilterData = selectedFilterData.filter(
            (item) => item !== areaRangeFilter
          );
          div.remove();
          updateVisibility();
        });
      }

      console.log("Saved Filters:", selectedFilterData);
    } else {
      console.log("Error: Both area range values are required.");
    }

    updateVisibility();
  });

// Clear all selected filters when the "clear" button is clicked
document.querySelector(".clear-button-design").addEventListener("click", () => {
  selectedFilterData.length = 0;
  const filterList = document.getElementById("selected-filters");
  filterList.innerHTML = "";
  updateVisibility();
});
// Bedroom count filter
document
  .getElementById("choose-number-4")
  .addEventListener("click", function () {
    console.log("bedrooms count selected");
    document.querySelector(".active").classList.remove("active");

    let bedroomsCount = document.getElementById("bedrooms-input").value;

    if (bedroomsCount) {
      if (!selectedFilterData.includes(`${bedroomsCount}`)) {
        selectedFilterData.push(bedroomsCount);
        const filterList = document.getElementById("selected-filters");
        const div = document.createElement("div");
        document.getElementById("bedrooms-input").value = "";
        div.innerHTML = `
      <div class="filtered-by-functionality" functionality>
        <div class="filtered-by bedrooms-count">${bedroomsCount}</div>
        <button class="remove-filter-x" clear-x>x</button>
      </div>`;

        filterList.appendChild(div);

        console.log(
          typeof parseInt(document.querySelector(".bedrooms-count").textContent)
        );
        div.querySelector(".remove-filter-x").addEventListener("click", () => {
          selectedFilterData = selectedFilterData.filter(
            (item) => item !== bedroomsCount
          );
          div.remove();
          updateVisibility();
        });
      } else {
        console.log("Error: Both area range values are required.");
      }

      updateVisibility();
    }
  });

updateVisibility();
