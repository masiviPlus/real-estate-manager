const updateVisibility = () => {
  if (!selectedFilterData || selectedFilterData.length === 0) {
    document.querySelector(".clear-button-design").classList.add("invisible");
  } else if (selectedFilterData.length > 0) {
    document
      .querySelector(".clear-button-design")
      .classList.toggle("invisible");
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
      <div class="filtered-by-functionality">
      <div class="filtered-by">
      ${filter}
      </div>
      <button class="remove-filter-x">x
      </button>
       </div>
      
      
      
      `;
      filterList.appendChild(div);
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
document.querySelector(".remove-filter-x").addEventListener("click", () => {
  selectedFilterData.length = 0;
  const filterList = document.getElementById("selected-filters");
  filterList.innerHTML = "";
  updateVisibility();
});
