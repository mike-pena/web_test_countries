let allCountries = [];

document.addEventListener("DOMContentLoaded", main);

async function main() {
    allCountries = await getAllCountries();
    
    allCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );
    
    renderCountries(allCountries);

    console.log(allCountries)
    
    setFilters();
}

function setFilters() {
    const searchInput = document.querySelector("#search");
    const regionFilter = document.querySelector(".region-filter");

    searchInput.addEventListener("input", handleFilters);
    regionFilter.addEventListener("change", handleFilters);
}

function handleFilters() {
    const searchValue = document.querySelector("#search").value.toLowerCase();
    const selectedRegion = document.querySelector(".region-filter").value;

    resultCountries = allCountries.filter(country => {
        const matchesName = country.name.common.toLowerCase().includes(searchValue);
        const matchesRegion = selectedRegion ? country.region === selectedRegion : true;

        return matchesName && matchesRegion;
    });

    renderCountries(resultCountries);
}