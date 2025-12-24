function renderCountries(countries) {
  const container = document.querySelector(".countries__container");

  container.innerHTML = "";

  if (countries.length === 0) {
    const message = document.createElement("p");
    message.classList.add("empty-state-message");
    message.textContent = "No se encontraron países que coincidan con tu búsqueda.";
    container.appendChild(message);
    return;
    }

  for (const country of countries) {
    const card = generateCard(country);

    card.addEventListener("click", () => {
      window.location.href = `detail.html?code=${country.cca3}`;
    });

    container.append(card);
  }
}

function generateCard(country) {
  const card = document.createElement("li");

  card.classList.add("card");

  const flagSrc = country.flags?.svg || country.flags?.png || "";
  const alt = country.flags?.alt || country.name.common;

  card.innerHTML = `
        <div class="card__flag-wrapper">
            <img class="card__flag-image" src="${flagSrc}" alt="${alt}" />
        </div>
        <div class="card__content">
            <h3 class="card__title">${country.name.common}</h3>
            <div class="card__details">
                <p class="card__detail"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p class="card__detail"><strong>Region:</strong> ${country.region}</p>
                <p class="card__detail"><strong>Capital:</strong> ${
                  country.capital?.[0] || "N/A"
                }</p>
            </div>
        </div>
    `;

  return card;
}
