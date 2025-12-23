const container = document.querySelector(".countries-container");

function renderCountries(countries) {
  container.innerHTML = "";

  countries.forEach(country => {
    const card = document.createElement("div");
    card.textContent = country.name.common;
    card.style.cursor = "pointer"; // en CSS ?

    card.addEventListener("click", () => {
      window.location.href = `detail.html?code=${country.name.common}`; // MAKE SURE IT'S SAFE TO USE THE NAME FOR THIS
    });

    container.append(card);
  });
}