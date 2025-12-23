let allCountries = [];

document.addEventListener("DOMContentLoaded", main);

async function main() {
    allCountries = await getAllCountries();
    
    allCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );
    
    renderCountries(allCountries);
    
    setControls();
}

function setControls() {
    const searchInput = document.querySelector("#search")

    searchInput.addEventListener("input", searchByName);
}

function searchByName() {
    const searchValue = document.querySelector("#search").value.toLowerCase();

    resultCountries = allCountries.filter(country => {
        const matchesName = country.name.common.toLowerCase().includes(searchValue);
        return matchesName;
    });

    renderCountries(resultCountries);
}