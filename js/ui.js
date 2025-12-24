function renderCountries(countries) {
    const container = document.querySelector(".countries-container");
    
    container.innerHTML = "";
    
    for (const country of countries) {
        const card = generateCard(country);

        card.addEventListener("click", () => {
            window.location.href = `detail.html?code=${country.cca3}`;
        });
        
        container.append(card);
    };
}

function generateCard(country) {
    const card = document.createElement("li");

    card.classList.add("card")

    const flagSrc = country.flags?.svg || country.flags?.png || "";
    const alt = country.flags?.alt || country.name.common;

    card.innerHTML = `
        <div class="card-wrapper">
            <img class="card__flag" src="${flagSrc}" alt="${alt}" />
        </div>
        <div class="card__info">
            <h3 class="card__title">${country.name.common}</h3>
            <div class="card__details">
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
            </div>
        </div>
    `

    return card;
}