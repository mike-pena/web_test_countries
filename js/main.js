let allCountries = [];
const searchInput = document.querySelector("#search");
const regionFilter = document.querySelector(".region-filter");

document.addEventListener("DOMContentLoaded", main);

async function main() {
    allCountries = await getAllCountries();
    
    allCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    searchInput.value = localStorage.getItem("searchValue") || "";
    regionFilter.value = localStorage.getItem("selectedRegion") || "";

    handleFilters()
    
    setFilters();
}

function setFilters() {
    searchInput.addEventListener("input", handleFilters);
    regionFilter.addEventListener("change", handleFilters);
}

function handleFilters() {
    const searchValue = document.querySelector("#search").value.trim().toLowerCase();
    const selectedRegion = document.querySelector(".region-filter").value;

    filteredCountries = allCountries.filter(country => {
        const matchesName = country.name.common.toLowerCase().includes(searchValue);
        const matchesRegion = selectedRegion ? country.region === selectedRegion : true;

        return matchesName && matchesRegion;
    });

    localStorage.setItem("searchValue", searchValue);
    localStorage.setItem("selectedRegion", selectedRegion);

    renderCountries(filteredCountries);
}