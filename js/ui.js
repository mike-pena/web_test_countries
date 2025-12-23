function renderCountries(countries) {
    const container = document.querySelector(".countries-container");
    
    container.innerHTML = "";
    
    countries.forEach(country => {
        const card = document.createElement("div");
        card.textContent = country.name.common;
        card.style.cursor = "pointer"; // en CSS ?

        card.addEventListener("click", () => {
            window.location.href = `detail.html?code=${country.cca3}`;
        });
        
        container.append(card);
    });
}