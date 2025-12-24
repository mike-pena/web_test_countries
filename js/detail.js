document.addEventListener("DOMContentLoaded", showCountryDetails);

async function showCountryDetails() {
  const params = new URLSearchParams(window.location.search);
  const countryCode = params.get("code");

  if (!countryCode) return;

  const countryData = await getCountryByCode(countryCode);

  console.log(countryData[0]);

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
  const container = document.querySelector(".country-details");

  const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";
  const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
  const nativeName = Object.values(country.name.nativeName)[0].common || country.common;

  container.innerHTML = `
      <div class="flag-wrapper">
        <img class="details__flag" src="${country.flags.svg}" alt="${country.flags.alt}" />
      </div>
        
      <div class="details__text">
        <h2 class="details__country-name">${country.name.common}</h2>
        
        <div class="details_country-info_container">
          <div class="country-info_column">
            <p><strong>Native Name:</strong> ${nativeName}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
          </div>
          <div class="country-info_column">
            <p><strong>Top Level Domain:</strong> ${country.tld[0]}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Languages:</strong> ${languages}</p>
          </div>
        </div>
        
        <div class="borders">
          <p><strong>Border Countries:</strong><p>
          <div class="borders-container"></div>
        </div>
      </div>
    `;

  renderBorders(country.borders);
}

async function renderBorders(borders) {
  const container = document.querySelector(".borders-container");

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
