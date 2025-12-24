let allCountries = [];
const searchInput = document.querySelector("#search");
let selectedRegion = localStorage.getItem("selectedRegion") || "";

document.addEventListener("DOMContentLoaded", main);

async function main() {
    allCountries = await getAllCountries();
    
    allCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    searchInput.value = localStorage.getItem("searchValue") || "";
    searchInput.addEventListener("input", handleFilters);

    setDropdownValue();
    initRegionDropdown();

    handleFilters();
}

function handleFilters() {
    const searchValue = searchInput.value.trim().toLowerCase();

    filteredCountries = allCountries.filter(country => {
        const matchesName = country.name.common.toLowerCase().includes(searchValue);
        const matchesRegion = selectedRegion ? country.region === selectedRegion : true;

        return matchesName && matchesRegion;
    });

    localStorage.setItem("searchValue", searchValue);
    localStorage.setItem("selectedRegion", selectedRegion);

    renderCountries(filteredCountries);
}

function initRegionDropdown() {
    const dropdown = document.querySelector(".dropdown");
    const button = dropdown.querySelector(".dropdown__button");
    const items = dropdown.querySelectorAll(".dropdown__item");

    button.addEventListener("click", () => {
        dropdown.classList.toggle("is-open");
    });

    items.forEach(item => {
        item.addEventListener("click", () => {
            selectedRegion = item.dataset.value;
            
            dropdown.querySelector(".dropdown__selected").innerText = item.innerText;
            dropdown.classList.remove("is-open");

            handleFilters();
        });
    });

    // cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) dropdown.classList.remove("is-open");
    });
}

function setDropdownValue() {
    if (selectedRegion) {
        const dropdownText = document.querySelector(".dropdown__selected");
        const items = document.querySelectorAll(".dropdown__item");
        items.forEach(item => {
            if (item.dataset.value === selectedRegion) {
                dropdownText.innerText = item.innerText;
            }
        });
    }
}