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
  }
  // Define the getAgents() function as a class method
  async getListings() {
    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`, // Use the token from apiToken
        },
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const data = await response.json(); // Parse the response JSON
      return data; // Return the agent data
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  }

  // Render the listing cards by fetching agent data
  async render() {
    const listings = await this.getListings(); // Wait for agents data
    const container = document.createElement("div");
    const cities = await this.getCities(); // Wait for the city data
    const regions = await this.getRegions(); // Wait for the region data

    container.classList.add("listings-grid");
    // Check if there are agents and iterate through them
    if (listings && listings.length) {
      listings.forEach((listing) => {
        const city = cities.find((city) => city.id === listing.city_id);
        const region = regions.find((region) => region.id === city?.region_id);

        const card = document.createElement("div");
        card.classList.add("listing-card");
        card.innerHTML = `
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

        container.appendChild(card); // Append each card to the container
      });
    } else {
      container.innerHTML = "<p>No listings available.</p>";
    }

    this.appendChild(container); // Append the container to the custom element
  }
  // Fetch all cities
  async getCities() {
    try {
      const response = await fetch(cityURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`, // Use your actual token
        },
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const data = await response.json();
      return data; // Return cities data
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
          Authorization: `Bearer ${apiToken}`, // Use your actual token
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

  // Lifecycle method called when the element is connected to the DOM
  connectedCallback() {
    this.render(); // Call render when the component is connected to the DOM
  }
}

// Define the custom element
customElements.define("listing-card", listingCard);
