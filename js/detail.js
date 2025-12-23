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

  container.innerHTML = `
    <div class="details details-container">
        <img class="details__flag" src="${country.flags.svg}" alt="${country.flags.alt}" />
        
        <div class="details-info">
            <h2>${country.name.common}</h2>
            <p><strong>Native Name:</strong> ${country.nativeName}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Sub Region:</strong> ${country.subregion || "N/A"}</p>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
            <p><strong>Top Level Domain:</strong> ${country.tld}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Languages:</strong> ${languages}</p>

            <div class="borders">
                <p><strong>Border Countries:</strong><p>
                <div class="borders-container"></div>
            </div>
        </div>
    </div>
    `;

  renderBorders(country.borders);
}

async function renderBorders(borders) {
  const container = document.querySelector(".borders-container");

  if (!borders) {
    container.textContent = "None";
    return;
  }

  for (const code of borders) {
    const borderCountry = await getCountryByCode(code); 

    const button = document.createElement("button");
    button.textContent = borderCountry[0].name.common;

    button.addEventListener("click", () => {
      window.location.href = `detail.html?code=${code}`;
    });

    container.append(button);
  }
}
