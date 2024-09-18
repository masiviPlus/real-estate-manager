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

document
  .getElementById("choose-number-1")
  .addEventListener("click", function () {
    console.log("hello from reagion");
    document.querySelector(".active").classList.remove("active");
    const selectedFilters = [];

    document
      .querySelectorAll("#filters input[type='checkbox']:checked")
      .forEach((checkbox) => {
        const label = checkbox.parentElement.textContent.trim();
        selectedFilters.push(label);
      });
    selectedFilterData = selectedFilters;

    const filterList = document.getElementById("selected-filters");
    filterList.innerHTML = "";

    selectedFilterData.forEach((filter) => {
      const div = document.createElement("div");
      // div.textContent = filter;
      // div.classList.add("");
      div.innerHTML = `
      <div class="filtered-by-functionality" functionality>
      <div class="filtered-by">
      ${filter}
      </div>
      <button class="remove-filter-x" clear-x>x
      </button>
       </div>
      
      `;

      filterList.appendChild(div);
      div.querySelector(".remove-filter-x").addEventListener("click", () => {
        // Remove this filter from the selectedFilterData array
        selectedFilterData = selectedFilterData.filter(
          (item) => item !== filter
        );

        // Remove the filter from the DOM
        div.remove();
        console.log(selectedFilterData);

        // Optionally, update the clear button visibility
        updateVisibility();
      });
    });
    document
      .querySelectorAll("#filters input[type='checkbox']")
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
    console.log("Saved Filters:", selectedFilterData);
    updateVisibility();
  });

updateVisibility();

document.querySelector(".clear-button-design").addEventListener("click", () => {
  selectedFilterData.length = 0;
  const filterList = document.getElementById("selected-filters");
  filterList.innerHTML = "";
  updateVisibility();
});
// document.querySelector(".remove-filter-x").addEventListener("click", (e) => {
//   const isX = e.target.matches("[clear-x]");
//   if (!isX && e.target.closest("[functionality]") != null) return;

//   if (isX) {
//     selectedFilterData.length = 0;
//     const filterList = document.getElementById("selected-filters");
//     filterList.innerHTML = "";
//   }

//   updateVisibility();
// });

document
  .getElementById("choose-number-2")
  .addEventListener("click", function () {
    console.log("hello from reagion");
    document.querySelector(".active").classList.remove("active");
    const selectedFilters = [];
    if (
      document.getElementById("lari-lower").value &&
      document.getElementById("lari-upper").value
    ) {
      selectedFilters.push(document.getElementById("lari-lower").value);
      selectedFilters.push(document.getElementById("lari-upper").value);
      console.log("put through");
      console.log(selectedFilters);

      selectedFilterData = selectedFilters;

      const filterList = document.getElementById("selected-filters");
      filterList.innerHTML = "";

      const div = document.createElement("div");
      // div.textContent = filter;
      // div.classList.add("");
      div.innerHTML = `
         <div class="filtered-by-functionality" functionality>
         <div class="filtered-by">
         ${selectedFilters[0]}₾ - ${selectedFilters[1]}₾
         </div>
         <button class="remove-filter-x" clear-x>x
         </button>
          </div>
         
         `;

      filterList.appendChild(div);
      div.querySelector(".remove-filter-x").addEventListener("click", () => {
        // Remove this filter from the selectedFilterData array
        selectedFilterData = selectedFilterData.filter(
          (item) => item !== filter
        );

        // Remove the filter from the DOM
        div.remove();
        console.log(selectedFilterData);

        // Optionally, update the clear button visibility

        updateVisibility();
      });
    } else {
      console.log("error");
    }
  });
