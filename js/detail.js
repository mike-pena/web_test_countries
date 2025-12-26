document.addEventListener("DOMContentLoaded", showCountryDetails);

async function showCountryDetails() {
  const params = new URLSearchParams(window.location.search);
  const countryCode = params.get("code");

  if (!countryCode) return;

  const countryData = await getCountryByCode(countryCode);

  renderCountryDetails(countryData[0]);

  setBackBtn();
}

function setBackBtn() {
  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}

function renderCountryDetails(country) {
  const container = document.querySelector(".country-detail");

  console.log(country);

  const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";
  const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
  const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common;

  container.innerHTML = `
      <div class="country-detail__flag">
        <img class="country-detail__flag-image" src="${country.flags.svg}" alt="${country.flags.alt || `Flag of ${country.name.common}`}" />
      </div>
        
      <div class="country-detail__content">
        <h2 class="country-detail__name">${country.name.common}</h2>
        
        <div class="country-detail__info">
          <div class="country-detail__column">
            <p class="country-detail__item"><strong>Native Name:</strong> ${nativeName}</p>
            <p class="country-detail__item"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="country-detail__item"><strong>Region:</strong> ${country.region}</p>
            <p class="country-detail__item"><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
            <p class="country-detail__item"><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
          </div>
          <div class="country-detail__column">
            <p class="country-detail__item"><strong>Top Level Domain:</strong> ${country.tld?.[0] || "N/A"}</p>
            <p class="country-detail__item"><strong>Currencies:</strong> ${currencies}</p>
            <p class="country-detail__item"><strong>Languages:</strong> ${languages}</p>
          </div>
        </div>
        
        <div class="country-detail__borders">
          <p class="country-detail__borders-label"><strong>Border Countries:</strong></p>
          <div class="country-detail__borders-container"></div>
        </div>
      </div>
    `;

  renderBorders(country.borders);
}

async function renderBorders(borders) {
  const container = document.querySelector(".country-detail__borders-container");

  if (!borders) {
    container.innerHTML = `
      <p>None</p>
      `;
    return;
  }

  for (const code of borders) {
    const borderCountry = await getCountryByCode(code); 

    const button = document.createElement("button");
    button.classList.add("border-country__btn")
    button.textContent = borderCountry[0].name.common;
    button.title = borderCountry[0].name.common;

    button.addEventListener("click", () => {
      window.location.href = `detail.html?code=${code}`;
    });

    container.append(button);
  }
}
