const apiToken = "9d0c8a68-e313-4417-8940-4abcd5c30ce0";
const apiURL =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";
const regionURL =
  "https://api.real-estate-manager.redberryinternship.ge/api/regions";
const estateURL =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";
const cityURL =
  "https://api.real-estate-manager.redberryinternship.ge/api/cities";

class listingCard extends HTMLElement {
  constructor() {
    super();
    document
      .querySelector(".clear-button-design")
      .addEventListener("click", () => {
        this.innerHTML = "";
      });
  }

  async getListings() {
    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  }

  async render() {
    const listings = await this.getListings();
    const container = document.createElement("div");
    const cities = await this.getCities();
    const regions = await this.getRegions();
    const filteredListings = this.filterListings(listings);

    container.classList.add("listings-grid");
    if (filteredListings && filteredListings.length) {
      filteredListings.forEach((listing) => {
        async function getDescription(id) {
          try {
            const response = await fetch(
              `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${apiToken}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Error: " + response.status);
            }

            const data = await response.json();

            return data.description;
          } catch (error) {
            console.error("Failed to fetch listings:", error);
          }
        }
        async function getAgentData(id) {
          try {
            const response = await fetch(
              `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${apiToken}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Error: " + response.status);
            }

            const data = await response.json();

            return data.agent;
          } catch (error) {
            console.error("Failed to fetch listings:", error);
          }
        }
        const city = cities.find((city) => city.id === listing.city_id);
        console.log(city);
        const region = regions.find((region) => region.id === city?.region_id);
        const statusLabel = listing.is_rental ? "ქირავდება" : "იყიდება";
        const card = document.createElement("div");
        card.classList.add("listing-card");

        card.innerHTML = `
          <div class="status-label">${statusLabel}</div>
            <img src="${listing.image}" class="img-apartment" alt="Apartment Picture">
            <div class="card-body">
             <h3 class="cost">${listing.price} ₾</h3>
             <p class="location icon-and-info">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"/></svg> ${listing.city.name}, ${listing.address}</p>
            <div class="lower-icons">

            <p class="icon-and-info">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M432 230.7a79.44 79.44 0 00-32-6.7H112a79.51 79.51 0 00-32 6.69A80.09 80.09 0 0032 304v112a16 16 0 0032 0v-8a8.1 8.1 0 018-8h368a8.1 8.1 0 018 8v8a16 16 0 0032 0V304a80.09 80.09 0 00-48-73.3zM376 80H136a56 56 0 00-56 56v72a4 4 0 005.11 3.84A95.5 95.5 0 01112 208h4.23a4 4 0 004-3.55A32 32 0 01152 176h56a32 32 0 0131.8 28.45 4 4 0 004 3.55h24.46a4 4 0 004-3.55A32 32 0 01304 176h56a32 32 0 0131.8 28.45 4 4 0 004 3.55h4.2a95.51 95.51 0 0126.89 3.85A4 4 0 00432 208v-72a56 56 0 00-56-56z"/></svg> ${listing.bedrooms}
             </p>
            <p class="icon-and-info">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M416 464H96a48.05 48.05 0 01-48-48V96a48.05 48.05 0 0148-48h320a48.05 48.05 0 0148 48v320a48.05 48.05 0 01-48 48z"/></svg> ${listing.area}
            </p>
            <p class="icon-and-info">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M491.31 324.69L432 265.37a31.8 31.8 0 00-22.63-9.37H272v-32h144a32 32 0 0032-32V96a32 32 0 00-32-32H272V48a16 16 0 00-32 0v16H102.63A31.8 31.8 0 0080 73.37l-59.31 59.32a16 16 0 000 22.62L80 214.63a31.8 31.8 0 0022.63 9.37H240v32H96a32 32 0 00-32 32v96a32 32 0 0032 32h144v48a16 16 0 0032 0v-48h137.37a31.8 31.8 0 0022.63-9.37l59.31-59.32a16 16 0 000-22.62z"/></svg> ${listing.zip_code}
            </p>
            </div>
            </div>
            
        `;

        container.appendChild(card);
        card.addEventListener("click", () => {
          document.getElementById("section").classList.add("hidden");
          document.querySelector("listing-card").style.display = "none";

          document.getElementById("details-section").style.display = "block";

          document.getElementById("detail-image").src = listing.image;
          document.getElementById(
            "detail-price"
          ).textContent = `${listing.price} ₾`;
          document.getElementById(
            "detail-location"
          ).textContent = `${listing.city.name}, ${listing.address}`;
          document.getElementById(
            "detail-area"
          ).textContent = `ფართი ${listing.area} მ²`;
          document.getElementById(
            "bedrooms-count"
          ).textContent = `საძინებელი ${listing.bedrooms}`;
          document.getElementById(
            "postal-code"
          ).textContent = `საფოსტო ინდექსი ${listing.zip_code}`;

          getDescription(listing.id).then((description) => {
            document.getElementById("detail-description").textContent =
              description || "აღწერა არ არის მოცემული";
          });

          getAgentData(listing.id).then((info) => {
            document.getElementById("agent-image").src = info.avatar;
            document.getElementById(
              "agent-name"
            ).textContent = `${info.name} ${info.surname}`;
            document.getElementById("position").textContent = `აგენტი`;
            document.getElementById("agent-email").textContent = info.email;
            document.getElementById("agent-number").textContent = info.phone;
          });

          document
            .getElementById("confirmBtn")
            .addEventListener("click", async function () {
              try {
                const response = await fetch(
                  `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${listing.id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${apiToken}`,
                    },
                  }
                );

                if (!response.ok) {
                  throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                alert(data.message);
                document.getElementById("section").classList.remove("hidden");
                document.querySelector("listing-card").style.display = "grid";

                document.getElementById("details-section").style.display =
                  "none";
                updateListings();
              } catch (error) {
                console.error("Error deleting real estate:", error);
                alert("Failed to delete the real estate.");
              }
            });
        });
      });
    } else {
      container.innerHTML = "<p>No listings available.</p>";
    }

    this.appendChild(container);
  }
  async getCities() {
    try {
      const response = await fetch(cityURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  }

  // Fetch all regions
  async getRegions() {
    try {
      const response = await fetch(regionURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${apiToken}`, // Use your actual token
        },
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const data = await response.json();
      return data; // Return regions data
    } catch (error) {
      console.error("Failed to fetch regions:", error);
    }
  }

  filterListings(listings) {
    // Example: filtering by selected filter data
    return listings.filter((listing) => {
      const passesPriceFilter = this.checkPriceFilter(listing.price);
      const passesAreaFilter = this.checkAreaFilter(listing.area);
      const passesBedroomFilter = this.checkBedroomFilter(listing.bedrooms);
      const passesRegionFilter = this.checkRegionFilter(
        listing.city.region.name
      );
      console.log(`Bedrooms ${listing.bedrooms}: ${passesBedroomFilter}`);
      return (
        passesPriceFilter &&
        passesAreaFilter &&
        passesBedroomFilter &&
        passesRegionFilter
      );
    });
  }
  checkBedroomFilter(bedrooms) {
    const bedroomFilterElement = document.querySelector(".bedrooms-count");
    const bedroomsValue = parseInt(
      document.querySelector(".bedrooms-count")?.textContent
    );
    if (!bedroomFilterElement || !bedroomsValue) {
      console.log("No bedroom filter applied.");
      return true;
    }
    // const bedroomFilter = document
    //   .querySelectorAll(".bedrooms-count")
    //   .textContent.trim();
    // if (!bedroomsValue) return true;
    // else {
    //   return bedrooms === bedroomsValue;
    // }

    if (!bedroomFilterElement || !bedroomsValue) {
      // If the bedroom filter is not set or empty, don't filter by bedrooms
      return true;
    }

    return bedrooms === bedroomsValue;
  }

  checkPriceFilter(price) {
    const lowerUpperBound = document
      .querySelector(".lari-lower-upper")
      ?.textContent.replaceAll("₾", "")
      .split(" - ")
      .map((value) => parseFloat(value.trim()));
    if (!lowerUpperBound) return true;
    const lowerBound = lowerUpperBound[0];
    const upperBound = lowerUpperBound[1];

    if (isNaN(lowerBound) || isNaN(upperBound)) return true;

    return price >= lowerBound && price <= upperBound;
  }

  checkAreaFilter(area) {
    const lowerUpperBound = document
      .querySelector(".area-lower-upper")
      ?.textContent.replaceAll("მ²", "")
      .split(" - ")
      .map((value) => parseFloat(value.trim()));
    if (!lowerUpperBound) return true;
    const lowerBound = lowerUpperBound[0];
    const upperBound = lowerUpperBound[1];
    if (!lowerBound || !upperBound) return true;

    return area >= lowerBound && area <= upperBound;
  }

  checkRegionFilter(region) {
    const regionFilterElement = document.querySelector(".region");
    const regionValue = document.querySelector(".region")?.textContent;
    if (!regionFilterElement || !regionValue) {
      console.log("No region filter applied.");
      return true;
    }

    if (!regionValue) return true;
    else {
      console.log(regionValue);
      return region === regionValue;
    }
  }

  connectedCallback() {
    this.render();
    document.querySelector(".logo").addEventListener("click", () => {
      document.getElementById("section").classList.remove("hidden");

      document.querySelector("listing-card").style.display = "grid";

      document.getElementById("details-section").style.display = "none";
    });
    const openModalBtn = document.getElementById("delete-listing");
    const popupModal = document.getElementById("popupModal");
    const confirmBtn = document.getElementById("confirmBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    openModalBtn.addEventListener("click", () => {
      popupModal.classList.add("show");
    });

    confirmBtn.addEventListener("click", () => {
      popupModal.classList.remove("show");
    });

    cancelBtn.addEventListener("click", () => {
      popupModal.classList.remove("show");
    });

    document
      .getElementById("bedrooms-input")
      .addEventListener("change", this.updateListings.bind(this));

    const selectedFiltersContainer =
      document.getElementById("selected-filters");

    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          this.updateListings();
          break;
        }
      }
    };

    const observer = new MutationObserver(callback);

    const config = { childList: true, subtree: true };

    observer.observe(selectedFiltersContainer, config);

    const clearButtons = document.querySelectorAll(".remove-filter-x");
    clearButtons.forEach((button) => {
      button.addEventListener("click", this.updateListings.bind(this));
    });
  }

  updateListings() {
    this.innerHTML = "";
    this.render();
  }
}

// Define the custom element
customElements.define("listing-card", listingCard);
